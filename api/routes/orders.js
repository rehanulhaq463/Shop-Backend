const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/order');

//Orders
router.get('/', checkAuth, OrdersController.orderGet);

router.post('/', checkAuth, OrdersController.orderPost);

//Order Id
router.get('/:orderId', checkAuth, OrdersController.orderGetById);

router.delete('/:orderId', checkAuth, OrdersController.orderDelete);

module.exports = router;