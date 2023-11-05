const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const User = require('../models/userModel')
const { isAdmin } = require("../services/IsAdmin");
//@desc Get all products
//@route GET /api/products
//@access public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

//@desc Create New productxxxxxxxx
//@route POST /api/products
//@access private
const createProduct = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const {product_name,category,company_name,price,description,quantity,ratings} = req.body;
  if (!product_name || !category || !company_name || !price || !description) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }

  const isAdm = await isAdmin(req.user.id)
  console.log("iiiiiissssss",isAdm);
  if(isAdm != "ADMIN")
  {
    res.status(401)
    throw new Error("User cant access this method")
  }
  
  const product = await Product.create({
    product_name,
    category,
    company_name,
    price,
    description,
    quantity
  });

  res.status(201).json({Success:true,data:product});
});

//@desc Get product
//@route GET /api/products/:id
//@access public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json({Success:true,data:product});
});

//@desc Update product
//@route PUT /api/products/:id
//@access private
const updateProduct = asyncHandler(async (req, res) => {
  console.log("innnn");
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const isAdm = await isAdmin(req.user.id)
  console.log("iiiiiissssss",isAdm);
  if(isAdm != "ADMIN")
  {
    res.status(401)
    throw new Error("User cant access this method")
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({Success:true,message:"Product updated successfully"});
});

//@desc Delete product
//@route DELETE /api/products/:id
//@access private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const isAdm = await isAdmin(req.user.id)
  console.log("iiiiiissssss",isAdm);
  if(isAdm != "ADMIN")
  {
    res.status(401)
    throw new Error("User cant access this method")
  }

  await Product.deleteOne({ _id: req.params.id });
  res.status(200).json({Success:true,message:"Product deleted successfully"});
});

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};