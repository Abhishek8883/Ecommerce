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


    getSingleOrderDetails : catchAsyncErrors(async(req,res,next) => {

        const order = await Order.findById(req.params.id).populate("user");

        if(!order){
            return next(new ErrorHandler("Invalid order Id",404))
        }

        return successResponseData(res,order);
    }),


    getLoggedUserOrders: catchAsyncErrors(async (req,res,next) => {

        const orders = await Order.find({user:req.user._id})

        if(!orders){
            return next(new ErrorHandler("Invalid user Id",404))
        }

        return successResponseData(res,orders);
        
    }),
}