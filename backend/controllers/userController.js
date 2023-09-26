const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");
const saveToken  = require("../utils/jwtToken"); 
const sendEmail = require("../utils/sendEmail");
const {successResponse,successResponseData} = require("../services/response");
const crypto = require("crypto");

module.exports = {

    registerUser: catchAsyncErrors(async (req, res, next) => {
        const { name, email, password } = req.body;

        const user = await User.create({
            name, email, password,
            avatar: {
                public_id: "Sample",
                url: "temp"
            }
        })

        saveToken(res, user, 201)
    }),


    userLogin: catchAsyncErrors(async (req, res, next) => {
        const { email, password } = req.body;

        //checking email and password both are given

        if (!email || !password) {
            return next(new ErrorHandler("Please enter email and password."))
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Invalid email or password.", 401))
        }

        const isPasswordMatched = user.comparePassword(password);

        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid email or password.", 401))
        }

        saveToken(res, user)
    }),


    userLogout : catchAsyncErrors(async (req,res,next) => {
        res.cookie("token",null,{
            expires:new Date(Date.now()),

            httpOnly:true
        })

        return successResponse(res,"Logged out");
    }),


    forgotPassword : catchAsyncErrors(async (req,res,next) => {
        const user = await User.findOne({email:req.body.email});

        if(!user){
            return next(new ErrorHandler("User not found",404));
        }

        const resetToken = user.getPassswordResetToken();

        await user.save({validateBeforeSave:false});

        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

        const message = `Click on the link to reset your password \n\n ${resetPasswordUrl} \n\n Ignore if not requested by you. `

        try {
            await sendEmail({
                email:user.email,
                subject:`Ecommece Password Recovery`,
                message
        });

        return successResponse(res,`Email sent to ${user.email} successfully.`)
            
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({validateBeforeSave:false});

            return next(new ErrorHandler(error,500))
        }
    }),


    getLoggedUserdetails: catchAsyncErrors(async (req,res,next) => {
        const user = await User.findById(req.user.id);

        return successResponseData(res,user)
    }),


    resetPassword: catchAsyncErrors(async (req,res,next) => {
        //creating password hash
        const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

        const user  = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt : Date.now()},
        });

        if(!user){
            return next(new ErrorHandler("Reset Password Token is invalid or has been expired",400))
        }

        if(!req.body.password && !req.body.confirmPassword){
            return next(new ErrorHandler("Please fill all the fields",400));
        }

        if(req.body.password !== req.body.confirmPassword){
            return next(new ErrorHandler("Password does not match",400));
        }

        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;
        user.password = req.body.password;
        user.save();

        saveToken(res,user);
    }),


    updateUserPassword : catchAsyncErrors(async (req,res,next) => {
        const user  = await User.findById(req.user.id).select("+password");

        const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

        if(!isPasswordMatched){
            return next(new ErrorHandler("Old password is incorrect",400));
        }

        if(req.body.newPassword !== req.body.confirmPassword){
            return next(new ErrorHandler("Password does not match",400));
        }

        user.password = req.body.newPassword;
        await user.save();

        saveToken(res,user);
    }),


    updateUserProfile : catchAsyncErrors(async (req,res,next) => {

        const {name,email} = req.body;

        const user = await User.findByIdAndUpdate(req.user.id,{name,email},{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })

        return successResponse(res,"User updated successfully.",202)
    }),

    
    //admin 
    getAllUsers : catchAsyncErrors(async (req,res,next) => {
        const users = await User.find();
        const totalUsers = await User.countDocuments();

        return successResponseData(res,{users,totalUsers});
    }),


    //admin
    getUserDetails :catchAsyncErrors(async (req,res,next) => {
        const user =  await User.findById(req.params.id);

        if(!user){
            return next(new ErrorHandler("User not exist / Incorrect ID"))
        }

        return successResponseData(res,user);
    }),


    //admin
    updateUserRole : catchAsyncErrors(async(req,res,next) => {
        const {name,email,role} = req.body;

        const user = await User.findByIdAndUpdate(req.user.id,{name,email,role},{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })

        return successResponse(res,"Role updated successfully.",202)
    }),


    //admin
    deleteUser : catchAsyncErrors(async (req,res,next) => {
        const user = await User.findByIdAndDelete(req.params.id);

        if(!user){
            return next(new ErrorHandler("User does not exist"));
        }

        return successResponse("User deleted successfully.")
    }),



}