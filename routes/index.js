const router = require('express').Router();
const apiRouter = require('./api');
const imageRouter = require('./images'); 

router.use('/api',apiRouter);


//ALL METHODS FOR IMAGES
router.use('/images',imageRouter);

module.exports = router;