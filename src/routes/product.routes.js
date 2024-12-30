const express = require("express");
const productController = require("../controllers/product.controller");

const router = express.Router();

// Create a new product
router.post("/product", productController.createProduct);

// Create multiple products
router.post("/products", productController.createProducts);

// Retrieve all products
router.get("/products", productController.getProducts);

// Retrieve a specific product by ID
router.get("/product/:id", productController.getProductById);

// Delete a product by ID
router.delete("/product/:id", productController.deleteProduct);

// Replace a product by ID
router.put("/product/:id", productController.replaceProduct);

// Update a product by ID
router.patch("/product/:id", productController.updateProduct);

module.exports = router;
