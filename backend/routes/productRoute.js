const router = require('express').Router();

const { isAuthenticated,authoriseRoles} = require("../middlewares/auth");

const {ADMIN} = require("../services/constants")

const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
    createProductReview
} = require("../controllers/productController")

router.get("/products", getAllProducts);

router.post("/admin/product/new", isAuthenticated,authoriseRoles(ADMIN),createProduct);

router.route("/admin/product/:id")
    .put(isAuthenticated, updateProduct)
    .delete(isAuthenticated, deleteProduct);


router.get("/product/:id",getProductDetails)

router.post("/product/review",isAuthenticated,createProductReview)


module.exports = router;