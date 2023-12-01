const router = require("express").Router();
const {isAuthenticated} = require("../middlewares/auth");
const {getCartItems, addItemCart, removeItemCart, updateItemQuantityCart, getCartItemsNumber} =require("../controllers/cartController");


router.get("/cart",isAuthenticated,getCartItems);

router.get("/cart/totalItems",isAuthenticated,getCartItemsNumber)

router.post("/cart/add",isAuthenticated,addItemCart)

router.route("/cart/:id")
    .delete(isAuthenticated,removeItemCart)
    .put(isAuthenticated,updateItemQuantityCart)


module.exports = router;
