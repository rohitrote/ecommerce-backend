const express = require('express')
const router =express.Router()
const {createProduct, getProducts, updateProduct, deleteProduct, getProduct} = require("../controllers/productController")
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/").get(getProducts).post(createProduct);

router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct)


module.exports = router;