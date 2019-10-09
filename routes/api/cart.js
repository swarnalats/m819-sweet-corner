const router = require('express').Router();
const addItemToCart = require('../../controllers/api/cart/add_item');
const getCartItems = require('../../controllers/api/cart/get_cart');
const getCartTotals = require('../../controllers/api/cart/cart_totals');


//GET  /api/cart
router.get('/',getCartItems);

//GET api/cart/totals - cart_totals.js
router.get('/totals',getCartTotals);

// api/cart/item/:product id

router.post('/items/:product_id',addItemToCart);

module.exports = router;