const db = require('../db');

exports.imageUrl = function (req,type,file){
    return `${req.protocol}://${req.get('host')}/images/${type}s/${file}`;
}

exports.getCartTotals = async function(cartId){
    console.log("Inside getcattotal:", cartId);
    const [[totals]] = await db.execute(`SELECT SUM(ci.quantity) AS items, SUM(p.COST * ci.quantity ) AS cost 
         FROM cart AS c 
         JOIN cartItems AS ci ON c.id=ci.cartId
         JOIN products AS p ON ci.productId = p.id  
         WHERE c.id=?  `,[cartId]);
    return {
        cost:parseInt(totals.cost) || 0,
        items:parseInt(totals.items) || 0
    }       

}

