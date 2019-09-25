const router = require('express').Router();
const testController = require('../../controllers/api/test')
const productRouter = require('./products');
const cartRouter = require('./cart');

router.get('/test',testController);

//All METHODS /api/products 


router.use('/products',productRouter);

router.use('/cart',cartRouter);

module.exports = router;
0
