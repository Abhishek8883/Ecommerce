const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");

module.exports = {

    getAllProducts:async (req, res, next) => {
        const products =await Product.find();
        res.status(200).json({success:true,products })
    },

   
    createProduct: async (req, res, next) => {
        const product = await Product.create(req.body);

        res.status(201).json({ messege: "Product created successfully."})
    },

    
    updateProduct:async (req,res,next) => {
        let product = await Product.findById(req.params.id);

        if(!product){
            return res.status(500).json({
                success:false,
                messege:"Product not found."
            })
        }

        product = await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        });

        res.status(200).json({
            success:true,
            product
        })
    },


    deleteProduct : async (req,res,next) => {

        const product = await Product.findByIdAndDelete(req.params.id);

        if(!product){
            return next(new ErrorHandler("Product not found",404))
        }

         res.status(200).json({ 
            success:true,  
            messege:"Product deleted successfully."
         })
    },

    getProductDetails : async (req,res,next)=> {
        const product = await Product.findById(req.params.id);

        if(!product){
            return next(new ErrorHandler("Product not found",404))
        }

         res.status(200).json({ 
            success:true,  
            product
         })
    },

}