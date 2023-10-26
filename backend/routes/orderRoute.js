const router = require("express").Router();
const {isAuthenticated,authoriseRoles} = require("../middlewares/auth");
const {ADMIN} = require("../services/constants")
const {
    createNewOrder, getSingleOrderDetails, getLoggedUserOrders, getAllOrders, updateOrder, deleteOrder
} = require("../controllers/orderController");



router.post("/order/new",isAuthenticated,createNewOrder);

router.get("/admin/order/:id",isAuthenticated,getSingleOrderDetails);

router.get("/order/myOrders",isAuthenticated,getLoggedUserOrders);

router.get("/admin/orders",isAuthenticated, authoriseRoles(ADMIN), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticated, authoriseRoles(ADMIN), updateOrder)
  .delete(isAuthenticated, authoriseRoles(ADMIN), deleteOrder);



module.exports = router;

