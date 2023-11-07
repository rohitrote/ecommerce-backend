const express = require('express');
const validateToken = require('../middleware/validateTokenHandler');
const { createOrder } = require('../controllers/orderController');
const router = express.Router();

router.use(validateToken);
router.route('/create-order').post(createOrder)
router.route('/getorders').get()


module.exports = router