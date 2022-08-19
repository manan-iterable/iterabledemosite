const getShoppingCart = (req, res) =>{
    let shoppingData = {
        "shoppingCartItems": [{
        "id": "2",
        "sku": "4",
        "name": "Iterable Mug",
        "description": "Drink it all up with this ceramic beauty",
        "categories": ["kitchen", "swag"],
        "price": 15.50,
        "quantity": 1,
        "imageUrl": "https://cdn.shopify.com/s/files/1/0543/9945/products/MOCK_UP-BIG.jpg?v=1415186087",
        "url": "iterable.com"
        }]
        };
    
    res.status(200).json(shoppingData);
}
const checkShopping = (req,res) =>{
    res.status(200).json({"status":true});
}

module.exports = {
    getShoppingCart,
    checkShopping
}