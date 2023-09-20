const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
let Constants = require("../services/constants");
const { successResponse,successResponseData } = require("../services/response");



module.exports = {

    getAllProducts: catchAsyncErrors(
        async (req, res, next) => {

            const resultPerPage = Constants.PAGINATION_LIMIT;
            const productCount =await Product.countDocuments();
            const apiFeature = new ApiFeatures(Product.find(), req.query)
                .search()
                .filter()
                .pagination(resultPerPage);
            const products = await apiFeature.query;

            return successResponseData(res,{products,productCount})

        }
    ),


    createProduct: catchAsyncErrors(
        async (req, res, next) => {
            req.body.createdBy = req.user.id;

            const product = await Product.create(req.body);

            return successResponseData(res,product,"Product created successfully.");
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

            return successResponseData(res,product);
        }
    ),


    deleteProduct: catchAsyncErrors(
        async (req, res, next) => {

            const product = await Product.findByIdAndDelete(req.params.id);

            if (!product) {
                return next(new ErrorHandler("Product not found", 404))
            }

                return successResponse(res,"Product deleted successfully.")
        }
    ),


    getProductDetails: catchAsyncErrors(
        async (req, res, next) => {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return next(new ErrorHandler("Product not found", 404))
            }

            return successResponseData(res,product)
        }
    ),

}