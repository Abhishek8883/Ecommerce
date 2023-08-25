const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");
const saveToken  = require("../utils/jwtToken")

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
    })
}