const path = require('path');

const express =  require('express');


const shopController = require('../controllers/shop');

const adminData = require('./admin');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/card',shopController.getCard);

router.get('/products/:productId',shopController.getProduct);

// router.get('/products');

// router.get('/checkout');

module.exports = router;