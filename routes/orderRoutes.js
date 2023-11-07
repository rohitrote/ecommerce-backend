const express = require('express');
const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router();

router.use(validateToken);
router.route('/create-order').post()
router.route('/getorders').get()


module.exports = router