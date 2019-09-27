const db = require('../../../db');
const jwt =  require('jwt-simple');
const { cartSecret} = require('../../../config/jwt_cart');

module.exports = async (req,res, next) => {
    try {
        let cartToken = req.headers['x-cart-token'] || null;
        const {product_id} = req.params;

        let cartId = null; 
        const [[product = null]] = await db.execute('SELECT id from products WHERE pid =?', [product_id]);
      
        console.log("Product:",product);

        if(!product) {
            throw new StatusError(404, `No product with id ${product_id}`);
        }

        // const test = {
        //     name: "Swarna",
        //     id:6,
        //     favColor:"Peach"
        // }


        // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiU3dhcm5hIiwiaWQiOjYsImZhdkNvbG9yIjoiUGVhY2gifQ.GqtK2hTmczPLFWW30vTsYzgDPxkpsmM7mp1QEkpAbd4';
        // const mydata = jwt.decode (cartToken, cartSecret);
        
        //Validate the product_id, is it a real product_id 

        //Need to check if a user already has a cart

        if(!cartToken){
                //Create a cart 
                //Create a token for that cart 

                const [[activeCartStatus = null]] = await db.query('SELECT id FROM cartStatuses WHERE mid="active"');
                if(!activeCartStatus){
                    throw new StatusError(500,"Error finding cart status");
                }
                console.log("Cart Status:",activeCartStatus);
                const [newCartResult] = await db.query('INSERT into cart (pid, statusId) VALUES(UUID(),?)',[activeCartStatus.id]);
                console.log('New Cart Result:',newCartResult);
                
                cartId = newCartResult.insertId ;

                const tokenData = {
                    cartId: cartId,
                    ts: Date.now()
                }

                cartToken = jwt.encode(tokenData, cartSecret);
            }else {
                const tokenData = jwt.decode(cartToken, cartSecret);

                cartId = tokenData.cartId;  
            }

const [[existingItem = null]] = await db.query('SELECT id, quantity FROM cartItmes WHERE productId = ? AND cartId = ? ', [product.id, cartId]);
console.log('ExistingItem:',existingItem);

if(!existingItem){
    const [addItemResult] = await db.execute('INSERT INTO cartItems (pid, cartId, productId, quantity) VALUES (UUID(),?,?,?', [cartId, product.id],1);
    console.log('Add Item Result',addItemResult);
}else {
    //Update existing items quantity 
}

{
    cartId: '',
    cartToken:'',
    message:'1 cupcake added to cart'

}
//If no cart, create a new cart

        // Does item exist in cart 
        
        //if yes, increase the quantity 
        
        //if no, add as new item to cart

        res.send({
            message: 'Add Item to cart',
            productID:product_id,
            cartToken, 
            cartId
        })

    }
    catch(err){
        next(err);
    }
}