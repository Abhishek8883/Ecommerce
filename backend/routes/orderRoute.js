const router = require("express").Router();
const {isAuthenticated,authoriseRoles} = require("../middlewares/auth");
const {ADMIN} = require("../services/constants")
const {
    createNewOrder, getSingleOrderDetails, getLoggedUserOrders
} = require("../controllers/orderController");



router.post("/order/new",isAuthenticated,createNewOrder);

router.get("/admin/order/:id",isAuthenticated,authoriseRoles(ADMIN),getSingleOrderDetails);

router.get("/order/myOrders",isAuthenticated,getLoggedUserOrders);


module.exports = router;

