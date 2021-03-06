const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json')


module.exports = class Cart {
    static addProduct(id, price) {
        fs.readFile(p,(err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
                const Index = cart.products.findIndex((prod) => prod.id === id);
                const existingProduct = cart.products[Index];
                let updatedProduct = {};
                if (existingProduct) {
                    updatedProduct = { ...existingProduct }
                    updatedProduct.qty = updatedProduct.qty + 1;
                    cart.products = [...cart.products]
                    cart.products[Index] = updatedProduct;
                } else {
                    updatedProduct = { id: id, qty: 1 };
                    cart.products = [...cart.products, updatedProduct];

                }
                cart.totalPrice = parseInt(cart.totalPrice||"0")  + parseInt(price)
            }
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                    console.log(err)
                })
        })
    }
}