const router = require('express').Router();
const testController = require('../../controllers/api/test')
const productRouter = require('./products');

router.get('/test',testController);

//All METHODS /api/products 


router.use('/products',productRouter);

module.exports = router;