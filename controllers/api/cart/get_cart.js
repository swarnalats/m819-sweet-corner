const db = require('../../../db');
const jwt = require('jwt-simple');
const {cartSecret} = require('../../../config/jwt_cart');
const {getCartTotals, imageUrl} = require('../../../helpers');

module.exports = async (req,res,next) => {
    try {

        //Cart Token 
        const cartToken = req.headers['x-cart-token'] || null; 

        //throw error if no token
        if(!cartToken){
            throw new StatusError(400, "Missing Cart Token");
        }
         //decode token 
        const tokenData = jwt.decode(cartToken, cartSecret);

        //query db to get an array of all the items in the cart  
        const [results] = await db.execute(`SELECT ci.createdAt AS added,p.cost AS "each",
            ci.cartId AS itemId,p.name,p.pid AS productId,ci.quantity,(ci.quantity * p.cost) AS total,
            i.altText,i.file FROM cart AS c
            JOIN cartItems AS ci ON c.id=ci.cartId
            JOIN products AS p ON ci.productId=p.id 
            JOIN images AS i on p.id=i.productId  
            where c.id=? AND i.type="thumbnail"`,[tokenData.cartId] );

        let cartId = null;  
        
        const items = results.map( i => {
            const { altText, file, total,cartId: cid , ...item} = i;
            cartId = cid;

            return {
                ...item,
                thumbnail:{
                    altText:altText,
                    url:imageUrl(req,"thumbnail",file)
                },
                total:total
            }

        } );

        //get cart totals 
        const total = await getCartTotals(tokenData.cartId);
        //send the data back

        res.send({
        // cartItems: cartItems
            cartId, items, total
        });
    } 
catch(err) { 
    next(err);
}
}
