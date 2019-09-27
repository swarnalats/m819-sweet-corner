const db = require('../../../db');

module.exports = async (req,res,next) => {
     try {
//         const {pid} = req.params;
//         const [results] = await db.query(`SELECT c.quantity,c.productId, p.productId,  p.cost from cartItems as c 
//         JOIN products AS p ON c.productId = p.productId `);  
        
// // console.log("Products:", results); 

// let totalQuantity =0;
// let totalCost = 0;

// const cartItems = results.map(p => {
//     totalquantity + p.quantity, 
//     totalCost + p.cost
//     }   
// );  


// res.send({
//     "total": {
//         "cost":cartItems[0],
//         "items":cartItems[1]
//     }  
// });
        res.send({
            message:"Getting the totals for the items"
        })
} 
catch(err) { 
    next(err);
}
}
