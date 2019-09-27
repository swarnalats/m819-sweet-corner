const db = require('../../../db');
const {imageUrl} = require('../../../helpers/');

module.exports =  (req,res,next) => {
    try {
//         const {pid} = req.params;
//         const [results] = await db.query(`SELECT c.pid as id,c.cartId,c.quantity,c.productId as cid, p.productId as prodId, c,createdAt, p.cost, p.name  from cartItems as c 
//         JOIN products AS p ON c.productId = p.productId
//         JOIN images as i ON p.productId = i.productId WHERE i.type = "thumbnail" `);  
        
// // console.log("Products:", results); 

// const cartItems = results.map(p => {
//   const cartItem = {
//         cartID:p.cartId,
//        "item": {
//            "added":p.createdAt,
//            "each":p.cost,
//            "itemId":p.id,
//            "productID":p.productId,
//            "name":p.name,
//            "quantity":p.quantity,
//            "thumbnail":{
//                 altText:p.altText,
//                 url:imageUrl(req,p.type,p.file)
//             },
//             "total": p.quantity * p.cost,
//         }, 
//         "total": {
//             "cost": p.quantity * p.cost, 
//             "item": p.quantity
//         }  
//     }   
//     return cartItem;
// });  

res.send({
//    cartItems: cartItems
    message:"Getting items from the cart"
});
} 
catch(err) { 
    next(err);
}
}
