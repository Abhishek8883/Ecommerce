const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const { PAGINATION_LIMIT } = require("../services/constants")

module.exports = {

    getAllProducts: catchAsyncErrors(
        async (req, res, next) => {

            const resultPerPage = PAGINATION_LIMIT;
            const productCount =await Product.countDocuments();
            const apiFeature = new ApiFeatures(Product.find(), req.query)
                .search()
                .filter()
                .pagination();
            const products = await apiFeature.query;
            res.status(200).json({ success: true, products ,productCount})
        }
    ),


    createProduct: catchAsyncErrors(
        async (req, res, next) => {
            const product = await Product.create(req.body);

            res.status(201).json({ messege: "Product created successfully." })
        }
    ),


    updateProduct: catchAsyncErrors(
        async (req, res, next) => {
            let product = await Product.findById(req.params.id);

            if (!product) {
                return next(new ErrorHandler("Product not found."), 404);
            }

            product = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            });

            res.status(200).json({
                success: true,
                product
            })
        }
    ),


    deleteProduct: catchAsyncErrors(
        async (req, res, next) => {

            const product = await Product.findByIdAndDelete(req.params.id);

            if (!product) {
                return next(new ErrorHandler("Product not found", 404))
            }

            res.status(200).json({
                success: true,
                messege: "Product deleted successfully."
            })
        }
    ),


    getProductDetails: catchAsyncErrors(
        async (req, res, next) => {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return next(new ErrorHandler("Product not found", 404))
            }

            res.status(200).json({
                success: true,
                product
            })
        }
    ),

}