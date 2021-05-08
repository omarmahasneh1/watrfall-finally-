const router = require("express").Router();

const productController = require("../controllers/product.controller");

router.get("/", productController.getproduct);

router.get("/:id", productController.getproductById);

module.exports = router;
