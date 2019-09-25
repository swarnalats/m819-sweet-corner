const db = require('../../../db');
const {imageUrl} = require ('../../../helpers');

module.exports = async (req,res,next) => {
    try {

    const {product_id} = req.params;    
    const [result] = await db.execute(`
         SELECT p.pid AS id, p.caption, p.cost, p.description, p.name, i.pid as imageId, i.altText, i.file,i.type
         FROM products as p 
         JOIN images as i ON p.id = i.productId 
         where p.pid =? `, [product_id]) ;

    if(!result.length){
        throw new StatusError(404, `Invalid product ID: ${product_id}`); 
    }

    let product = {};
    
    result.forEach( p => {
            
            const {altText, file, type,ImageId:id, ... rest} = p;
            const imageKey = type.indexOf('_') !== -1 ? type.split('_')[1] : type;
                        
            product = {
                ...product,
                ...rest,
                [imageKey] :{
                    id: id,
                    altText:altText,
                    file:file,
                    type:type + 's',
                    url:imageUrl(req,type,file)   
                }
            }
        }) ;    
       
    res.send({
        product
     });
    }
    catch(err){
        next(err);
    }
}