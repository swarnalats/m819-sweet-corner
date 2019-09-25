const db = require('../../../db');
const {imageUrl} = require('../../../helpers/');

module.exports = async(req,res,next) => {
    try {
        
    // Data , Field Data
    //[ [],[]]
    const [results] = await db.query(`SELECT p.pid as id,p.caption,p.cost, p.name, i.file,i.altText, i.type, i.pid as ImageId
             FROM products AS p 
             JOIN images AS i ON i.productId = p.id WHERE i.type="thumbnail"`);

   // console.log("Products:", results); 

   const products = results.map(p => {
       const product = {
            id:p.id,
            caption:p.caption,
            cost:p.cost,
            name:p.name,
            thumbnail:{
                id:p.imageId,
                altText:p.altText,
                file:p.file,
                type:p.type,
                url:imageUrl(req,p.type,p.file)
            }
       };
       return product;
   });  
    res.send({
        products: products,
        
    });
} catch(err){
    next(err);
}
}

