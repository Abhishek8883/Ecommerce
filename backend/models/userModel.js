const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please enetr your name"],
        maxLength: [30, "Name cannot exceed than 30 characters"],
        minLength: 2
    },
    email: {
        type: String,
        required: [true, "Please enter your name."],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minLength: [8, "Password should contain atleast 8 characters."],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

//JWT token
userSchema.methods.setToken = function () {
    return JWT.sign({ id: this._id }, process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRY,
        })
};

//compare password
userSchema.methods.comparePassword =async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

//genearating password reset token
userSchema.methods.getPassswordResetToken = function(){

    //generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //hashing and adding reset token to schema  
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model("User", userSchema);