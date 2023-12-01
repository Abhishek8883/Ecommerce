const router = require("express").Router();
const {isAuthenticated} = require("../middlewares/auth");
const {getCartItems, addItemCart, removeItemCart, updateItemQuantityCart} =require("../controllers/cartController");


router.get("/cart",isAuthenticated,getCartItems);

router.post("/cart/add",isAuthenticated,addItemCart)

router.route("/cart/:id")
    .delete(isAuthenticated,removeItemCart)
    .put(isAuthenticated,updateItemQuantityCart)


module.exports = router;
