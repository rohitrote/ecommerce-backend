const express = require('express')
const router =express.Router()
const {createProduct, getProducts, updateProduct, deleteProduct, getProduct} = require("../controllers/productController")
const validateToken = require("../middleware/validateTokenHandler");
const { checkAdmin } = require('../middleware/checkAdmin');

router.use(validateToken);

router.route("/").get(getProducts).post(createProduct);
router.route("/:id").put(updateProduct).get(checkAdmin,getProduct).delete(checkAdmin,deleteProduct)


module.exports = router;