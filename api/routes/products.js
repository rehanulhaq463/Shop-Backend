const express = require('express'); 
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ProductController = require('../controllers/product');

//Products
router.get('/', ProductController.productGet);

router.post('/', checkAuth, ProductController.productPost);

//ProductId
router.get('/:productId', checkAuth, ProductController.productGetById); 

router.patch('/:productId', checkAuth, ProductController.productUpdate);

router.delete('/:productId', checkAuth, ProductController.productDelete);

module.exports = router