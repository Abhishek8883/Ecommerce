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

        const order = await Order.findById(req.params.id).populate('orderedBy','name email');

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


    // get all Orders -- Admin
    getAllOrders : catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();
  
    let totalAmount = 0;
  
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    return successResponseData(res,{totalAmount,orders})
  }),
  
  // update Order Status -- Admin
  updateOrder : catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    if (order.orderStatus === "Delivered") {
      return next(new ErrorHandler("You have already delivered this order", 400));
    }
  
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (item) => {
        await updateStock(item.product, item.quantity);
      });
    }

    order.orderStatus = req.body.status;
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });

    return successResponse(res)
  }),
  
  
  // delete Order -- Admin
    deleteOrder : catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findByIdAndRemove(req.params.id);
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    res.status(200).json({
      success: true,
    });
  })
}

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
  
    product.Stock -= quantity;
  
    await product.save({ validateBeforeSave: false });
}