const db = require('../../../db');
const jwt =  require('jwt-simple');
const { cartSecret} = require('../../../config/jwt_cart');
const {imgUrl, getCartTotals} = require('../../../helpers');

module.exports = async (req,res, next) => {
    try {
        let cartToken = req.headers['x-cart-token'] || null;
        const {quantity = 1} = req.body;
        const {product_id} = req.params;
        let cartId = null; 

        if(isNaN(quantity)){
            throw new StatusError(422, "Invalid quantity received, must be a number");
        }

        // return res.send({    
        //     message:"Testing",
        //     quantity:quantity
        // });

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
                
                const [newCartResult] = await db.query('INSERT INTO cart (pid, statusId) VALUES(UUID(),?)',[activeCartStatus.id]);
                                
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

         const [[cart]] = await db.query('SELECT * FROM cart WHERE id=?',[cartId]); 
const [[existingItem = null]] = await db.query(`SELECT id, quantity FROM cartItems WHERE productId =? AND cartId =?`, [product.id, cartId]);
console.log('ExistingItem:',existingItem);
let itemId = null;

if(!existingItem){
    const [addItemResult] = await db.execute('INSERT INTO cartItems (pid, cartId, productId, quantity) VALUES (UUID(),?,?,?)', [cartId, product.id,1]);
    console.log('Add Item Result',addItemResult);
    itemId = addItemResult.insertId;
}else {
    //Update existing items quantity 
    console.log("CartID",cartId); 
    const [updateQuantity] = await db.query(`UPDATE cartItems SET quantity=quantity+? WHERE Id=?`, [quantity,existingItem.id]);
    console.log("UPDATED TABLE CartItems");
    itemId = existingItem.id; 
}

// {
//     cartId: '',
//     cartToken:'',
//     message:'1 cupcake added to cart'

// }
//If no cart, create a new cart

        // Does item exist in cart 
        
        //if yes, increase the quantity 
        
        //if no, add as new item to cart

        const [[output]] = await db.query(`SELECT ci.createdAt AS added, p.cost AS "each", ci.pid AS itemId, p.name, p.pid AS productId, ci.quantity, i.altText, i.file, (p.cost * ci.quantity) AS total FROM cartItems AS ci JOIN products AS p ON ci.productId=p.id JOIN images AS i ON i.productId=p.id WHERE ci.id=? AND i.type="thumbnail" LIMIT 1`,[itemId]);
        console.log("Cart Item Output:",output);

        const { altText ,file, ...itemInfo} = output;
               
        const total = await getCartTotals(cart.id); 
        console.log("YAY2");
        res.send({
            "cartId":cart.pid,
            "cartToken":cartToken,
            item: {
                ...itemInfo,
                thumbnail:{
                    altText:altText,
                    // url:imgUrl(req,"thumbnail",file)

                }
            },
            // message: `${output.quantity} ${itemInfo.name }Cupcakes added to the cart`,
            total:total
                
        });

    }
    catch(err){
        next(err);
    }
}