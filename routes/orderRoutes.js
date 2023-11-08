const express = require('express');
const validateToken = require('../middleware/validateTokenHandler');
const { createOrder, getOrders, getOrder, updateOrderStatus, getOrderByStatus } = require('../controllers/orderController');
const { checkAdmin } = require('../middleware/checkAdmin');
const router = express.Router();

router.use(validateToken);
router.use(checkAdmin)
router.route('/create-order').post(createOrder)
router.route('/getorders').get(getOrders)
router.route('/getorder/:id').get(getOrder)
router.route('/getorders/:status').get(getOrderByStatus)
router.route('/changeorder/:id/:status').put(updateOrderStatus)



module.exports = router