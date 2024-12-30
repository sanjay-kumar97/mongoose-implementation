const productService = require("../services/product.service");

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({
        success: false,
        error: "Failed to create product. " + err.message,
      });
  }
};

const createProducts = async (req, res) => {
  try {
    const products = await productService.createProducts(req.body);
    res.status(201).json({ success: true, data: products });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({
        success: false,
        error: "Failed to create products. " + err.message,
      });
  }
};

const getProducts = async (req, res) => {
  const { search, sort, order, page = 1, limit = 10 } = req.query;
  try {
    const validSort = ["name", "price", "category"];
    const validOrder = ["asc", "desc"];
    const sortBy = validSort.includes(sort) ? sort : "createdAt";
    const orderBy = validOrder.includes(order) ? order : "asc";

    const products = search
      ? await productService.getProductByName({
          search,
          sortBy,
          orderBy,
          page,
          limit,
        })
      : await productService.getAllProducts({ sortBy, orderBy, page, limit });

    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        success: false,
        error: "Failed to retrieve products. " + err.message,
      });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found." });
    }
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        success: false,
        error: "Failed to retrieve product. " + err.message,
      });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await productService.deleteProduct(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found." });
    }
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        success: false,
        error: "Failed to delete product. " + err.message,
      });
  }
};

const replaceProduct = async (req, res) => {
  try {
    const product = await productService.replaceProduct(
      req.params.id,
      req.body
    );
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found." });
    }
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        success: false,
        error: "Failed to replace product. " + err.message,
      });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found." });
    }
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        success: false,
        error: "Failed to update product. " + err.message,
      });
  }
};

module.exports = {
  createProduct,
  createProducts,
  getProducts,
  getProductById,
  deleteProduct,
  replaceProduct,
  updateProduct,
};
