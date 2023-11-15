const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
let Constants = require("../services/constants");
const { successResponse, successResponseData } = require("../services/response");



module.exports = {

    getAllProducts: catchAsyncErrors(
        async (req, res, next) => {

            const resultPerPage = Constants.PAGINATION_LIMIT;
            const productCount = await Product.countDocuments();
            const apiFeature = new ApiFeatures(Product.find(), req.query)
                .search()
                .filter()
                .pagination(resultPerPage);
            const products = await apiFeature.query;

            return successResponseData(res, { products, productCount,resultPerPage})

        }
    ),


    createProduct: catchAsyncErrors(
        async (req, res, next) => {
            req.body.createdBy = req.user.id;

            const product = await Product.create(req.body);

            return successResponseData(res, product, "Product created successfully.");
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

            return successResponseData(res, product);
        }
    ),


    deleteProduct: catchAsyncErrors(
        async (req, res, next) => {

            const product = await Product.findByIdAndDelete(req.params.id);

            if (!product) {
                return next(new ErrorHandler("Product not found", 404))
            }

            return successResponse(res, "Product deleted successfully.")
        }
    ),


    getProductDetails: catchAsyncErrors(
        async (req, res, next) => {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return next(new ErrorHandler("Product not found", 404))
            }

            return successResponseData(res, product)
        }
    ),


    //create or update user review
    createProductReview: catchAsyncErrors(async (req, res, next) => {
        const { rating, comment, productId } = req.body;

        const reviewObj = {
            createdBy: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment
        }

        console.log(productId);
        const product = await Product.findById(productId);
        if(!product){
            return next(new ErrorHandler("product not found."))
        }

        const isReviewed = product.reviews.find(
            rev => rev.createdBy.toString() === req.user._id.toString()
        );

        if (isReviewed) {
            product.reviews.forEach((rev) => {
                if (rev.createdBy.toString() === rev.user._id.toString()) {
                    rev.rating = rating,
                    rev.comment = comment
                }
            })
        } else {
            product.reviews.push(reviewObj)
            product.numOfReviews = product.reviews.length
        }

        let avg = 0;
        product.ratings = (product.reviews.forEach(rev => {
            avg += rev.rating;
        })) / product.reviews.length;

        product.save({validateBeforeSave:false});

        return successResponse(res,"Review submitted successfully.")
    }),


}