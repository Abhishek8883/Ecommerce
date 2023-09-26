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

router.post("/admn/product/new", isAuthenticated,authoriseRoles("admin"),createProduct);

router.route("/admin/product/:id")
    .put(isAuthenticated, updateProduct)
    .delete(isAuthenticated, deleteProduct);
    

router.get("/product/:id",getProductDetails)


module.exports = router;