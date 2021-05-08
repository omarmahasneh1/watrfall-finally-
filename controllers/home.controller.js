const productsModel = require("../models/productes.models");

exports.getHome = (req, res, next) => {
    let category = req.query.category;
    let validCategories = ["Waterfall", "flowervase", "vase","empty"];//empty for test ifnot product exist print'there is no products'
    let productsPromise;
    if (category && validCategories.includes(category))
        productsPromise = productsModel.getproductsByCategory(category);
    else productsPromise = productsModel.getAllproducts();
    productsPromise
        .then(products => {
            res.render("index", {
                products: products,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                validationError: req.flash("validationErrors")[0],
                pageTitle: "Home"
            });
        })
        .catch(err => {
            console.log(err);
        });
};
