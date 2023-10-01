const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const {successResponse,successResponseData} = require("../services/response")

module.exports = {

    createNewOrder: catchAsyncErrors(async (req, res, next) => {

        const { shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice } = req.body;

        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt:Date.now(),
            orderedBy:req.user._id
        })

        return successResponseData(res,order,"Order placed successfully",201);

    }),

    
}