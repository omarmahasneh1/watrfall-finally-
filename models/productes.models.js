const mongoose = require("mongoose");
const DB_URL ='mongodb://localhost:27017/waterfall-shope'

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    category: String
});
const product = mongoose.model("product", productSchema);
exports.getAllproducts = () => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return product.find({});
            })
            .then(products => {
                mongoose.disconnect();
                resolve(products);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.getproductsByCategory = category => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return product.find({ category: category });
            })
            .then(products => {
                mongoose.disconnect();
                resolve(products);
            })
            .catch(err => {
                mongoose.disconnect(reject(err));
            });
    });
};

exports.getFirstproduct = () => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return product.findOne({});//for get first product from database
            })
            .then(product => {
                mongoose.disconnect();
                resolve(product);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.addNewProduct = data => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                let newProduct = new Product(data);
                return newProduct.save();
            })
            .then(products => {
                mongoose.disconnect();
                resolve(products);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};
exports.getProductById = id => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return Product.findById(id);
            })
            .then(product => {
                mongoose.disconnect();
                resolve(product);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};