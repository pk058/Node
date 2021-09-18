const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(t) {
    this.id = t.id;
    this.title = t.title;
    this.description = t.description;
    this.img = t.img;
    this.price = t.price;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const Index = products.findIndex((product) => product.id === this.id)
        products[Index] = { ...this };
      } else {
        this.id = Math.random().toString()
		products.push(this)
      }
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((item) => item.id === id);
      if (product) {
        cb(product);
      }
    })
  }
};
