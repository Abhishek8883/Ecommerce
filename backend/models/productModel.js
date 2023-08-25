const mongoose = require('mongoose');

const productModel =new  mongoose.Schema({

    productName: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Plese enter product description']
    },
    price: {
        type: Number,
        required: [true, "Please enter the price of product"],
        maxLength: [8, "Price cannot exceed 8 characters"]
    },
    rating: {
        type: Number,
        default: 0,
        maxValue: [5, "Rating can not be greater than 5."]
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please enter product category"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter the stock"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String 

            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }


})

module.exports = mongoose.model("Product",productModel);