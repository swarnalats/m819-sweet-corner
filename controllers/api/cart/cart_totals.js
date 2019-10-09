const db = require('../../../db');
const jwt = require('jwt-simple');
const {cartSecret} = require('../../../config/jwt_cart');
const {getCartTotals} = require('../../../helpers');


module.exports = async (req,res,next) => {
     try {
        const cartToken = req.headers['x-cart-token'] || null;
        
        if(!cartToken){
            throw new StatusError(400, "Missing Cart Token");
        }

        const tokenData = jwt.decode(cartToken, cartSecret);

        const total = await getCartTotals(tokenData.cartId);
              
        res.send({
            total,
            message:"Getting the totals for the items"
        })
} 
catch(err) { 
    next(err);
}
}
