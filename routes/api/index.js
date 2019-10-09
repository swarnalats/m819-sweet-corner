const router = require('express').Router();
const testController = require('../../controllers/api/test')
const productsRouter = require('./products');
const cartRouter = require('./cart');


//GET /api/test
router.get('/test',testController);

//All METHODS /api/products 


router.use('/products',productsRouter);

router.use('/cart',cartRouter);

module.exports = router;

