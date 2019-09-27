module.exports = (req,res, next) => {
    try {

        const {product_id} = req.params;
        res.send({
            message: 'Add Item to cart',
            productID:product_id
        })

    }
    catch(err){
        next(err);
    }
}