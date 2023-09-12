const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");
const saveToken  = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

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

        saveToken(res, user, 201)
    }),


    userLogout : catchAsyncErrors(async (req,res,next) => {
        res.cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true
        })

        res.status(200).json({
            success:true,
            messege:"Logged Out"
        })
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

        res.status(200).json({
            success:true,
            messege:`Email sent to ${user.email} successfully.`
        })
            
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({validateBeforeSave:false});

            return next(new ErrorHandler(error,500))
        }
    }),
}