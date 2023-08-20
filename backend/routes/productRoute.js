const router = require('express').Router();

const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails
} = require("../controllers/productController")

router.get("/products",getAllProducts);

router.post("/product/new",createProduct);

router.route("/product/:id").get(getProductDetails).put(updateProduct).delete(deleteProduct);


module.exports = router;