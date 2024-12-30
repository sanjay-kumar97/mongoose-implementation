const Product = require("../models/product.model");

// Create a new product and save it to the database
const createProduct = async (productData) => {
  const product = new Product(productData);
  try {
    return await product.save();
  } catch (error) {
    throw new Error(`Error creating product: ${error.message}`);
  }
};

// Create multiple products and save them to the database
const createProducts = async (productData) => {
  try {
    return await Product.insertMany(productData);
  } catch (error) {
    throw new Error(`Error creating products: ${error.message}`);
  }
};

// Retrieve all products with sorting options
const getAllProducts = async ({
  sortBy = "createdAt",
  orderBy = "asc",
  page = 1,
  limit = 10,
}) => {
  const validSortFields = ["name", "price", "category", "createdAt"];
  const validOrderValues = ["asc", "desc"];

  if (
    !validSortFields.includes(sortBy) ||
    !validOrderValues.includes(orderBy)
  ) {
    throw new Error("Invalid sort or order parameters");
  }

  const products = await Product.find({})
    .sort({ [sortBy]: orderBy === "asc" ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();

  return products;
};

// Retrieve a product by its unique ID
const getProductById = async (id) => {
  const product = await Product.findById(id).exec();
  if (!product) throw new Error("Product not found");

  return product;
};

// Retrieve products by name with sorting options
const getProductByName = async ({
  search,
  sortBy = "name",
  orderBy = "asc",
  page = 1,
  limit = 10,
}) => {
  const validSortFields = ["name", "price", "category"];
  const validOrderValues = ["asc", "desc"];

  if (
    !validSortFields.includes(sortBy) ||
    !validOrderValues.includes(orderBy)
  ) {
    throw new Error("Invalid sort or order parameters");
  }

  return await Product.find()
    .byName(search)
    .sort({ [sortBy]: orderBy === "asc" ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
};

// Delete a product by its unique ID
const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id).exec();

  if (!product) throw new Error("Product not found");

  return product;
};

// Replace a product's details by its unique ID
const replaceProduct = async (id, productData) => {
  const product = await Product.findOneAndUpdate({ _id: id }, productData, {
    new: true,
  }).exec();

  if (!product) throw new Error("Product not found");

  return product;
};

// Update specific fields of a product by its unique ID
const updateProduct = async (id, productData) => {
  const product = await Product.findOneAndUpdate(
    { _id: id },
    { $set: productData },
    { new: true }
  ).exec();

  if (!product) throw new Error("Product not found");

  return product;
};

module.exports = {
  createProduct,
  createProducts,
  getAllProducts,
  getProductById,
  getProductByName,
  deleteProduct,
  replaceProduct,
  updateProduct,
};
