const router = require('express').Router();
const addItemToCart = require('../../controllers/api/cart/add_item');



//GET  /api/cart

//GET api/cart/totals - cart_totals.js


// api/cart/item/:product id

router.post('/item/:product_id',addItemToCart);

module.exports = router;