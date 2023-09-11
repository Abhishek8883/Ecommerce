const router = require('express').Router();

const { isAuthenticated,authoriseRoles} = require("../middlewares/auth");

const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails
} = require("../controllers/productController")

router.get("/products", isAuthenticated, getAllProducts);

router.post("/product/new", isAuthenticated,authoriseRoles("admin"),createProduct);

router.route("/product/:id")
    .get(getProductDetails)
    .put(isAuthenticated, updateProduct)
    .delete(isAuthenticated, deleteProduct);


module.exports = router;