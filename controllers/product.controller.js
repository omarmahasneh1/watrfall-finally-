const productsModel = require("../models/productes.models");

exports.getproduct = (req, res, next) => {
    productsModel
        .getFirstproduct()
        .then(product => {
            res.render("product", {
                product: product,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                pageTitle: "product Details"
            });
        })
        .catch(err => res.redirect("/error"));
};
exports.getproductById = (req, res, next) => {
    let id = req.params.id;
    productsModel
        .getProductById(id)
        .then(product => {
            res.render("product", {
                product: product,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                pageTitle: product.name
            });
        })
        .catch(err => res.redirect("/error"));
};

