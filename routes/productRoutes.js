const express = require('express')
const router =express.Router()
const {createProduct, getProducts, updateProduct, deleteProduct, getProduct} = require("../controllers/productController")
const validateToken = require("../middleware/validateTokenHandler");
const { checkAdmin } = require('../middleware/checkAdmin');
const {uploadProductImages} = require('../middleware/uploadProductImage')

router.use(validateToken);

router.route("/").get(getProducts).post(checkAdmin,createProduct);
router.route("/:id").put(checkAdmin,updateProduct).get(checkAdmin,getProduct).delete(checkAdmin,deleteProduct)


module.exports = router;