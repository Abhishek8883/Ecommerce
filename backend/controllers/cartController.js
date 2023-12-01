const catchAsyncErrors = require("../middlewares/catchAsyncError");
const Cart = require("../models/cartModel")
const ErrorHandler = require("../utils/errorHandler");
const { successResponse, successResponseData } = require("../services/response")


module.exports = {

    getCartItems: catchAsyncErrors(
        async (req, res, next) => {

            const userId = req.user._id

            const cartItems = await Cart.find({ userId }).populate("items.product");

            return successResponseData(res, cartItems)
        }
    ),

    addItemCart: catchAsyncErrors(
        async (req, res, next) => {
            const userId = req.user._id;

            const { productId, quantity } = req.body;

            const foundUser = await Cart.findOne({ userId });

            if (foundUser) {
                let itemExist = false;
                foundUser.items.forEach((item) => {
                    if (String(item.product) === productId) {
                        itemExist = true;
                    }
                })

                if (itemExist) {
                    return successResponse(res, "Item already in cart.", 200)
                }
                else {
                    const productObj = {
                        product: productId,
                        quantity
                    }

                    foundUser.items.push(productObj)
                    await foundUser.save();


                    return successResponse(res, "Item added to cart.", 201)
                }
            }
            else {
                const createdCartItem = await Cart.create({
                    userId, items: [{
                        product: productId, quantity
                    }]
                })
                return successResponse(res, "Item added to cart.", 201)
            }
        }
    ),

    updateItemQuantityCart: catchAsyncErrors(
        async (req, res, next) => {

            const userId = req.user._id;
            const productId = req.params.id;
            const {quantity} = req.body;

            if(quantity < 1){
                return next(new ErrorHandler("Quantity Should be atleast 1."))
            }

            const foundUser = await Cart.findOne({ userId });

            if (foundUser && foundUser.items.length > 0) {
                foundUser.items.forEach((item) => {
                    if (String(item.product) === productId) {
                        item.quantity = quantity;
                    }
                })
                await foundUser.save()

                return successResponse(res, `Quantity updated successfully to - ${quantity} .`, 202)
            }
            else {
                return next(new ErrorHandler("Item does not exist.", 404))
            }
        }
    ),

    removeItemCart: catchAsyncErrors(
        async (req, res, next) => {
            const productId = req.params.id;
            const userId = req.user._id

            const cartItem = await Cart.findOne({ userId });
            let newItems = null;

            if (cartItem && cartItem.items.length > 0) {
                newItems = cartItem.items.filter((item) => {
                    return (String(item.product) !== productId)
                })
            }
            else {
                return next(new ErrorHandler("Item not Found", 404))
            }

            if (newItems) {
                cartItem.items = newItems;
                await cartItem.save()
            }


            return successResponse(res, "Item removed from cart.", 202)
        }
    )


}