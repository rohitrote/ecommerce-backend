const Product = require("../models/productModel");
const User = require("../models/userModel");
//@desc Get all products
//@route GET /api/products
//@access public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ Success: true, data: products });
  } catch (error) {
    res.status(500).send({ Success: false, message: "Something went wrong" });
  }
};

//@desc Create New productxxxxxxxx
//@route POST /api/products
//@access private
const createProduct = async (req, res) => {
  try {
    const {
      product_name,
      category,
      company_name,
      price,
      description,
      quantity,
      ratings,
    } = req.body;

    // const product_image= req.file.path;
    if (!product_name || !category || !company_name || !price || !description) {
      res.status(400).json({Success:false,message:"All fields are mandatory !"});
    }

    const product = await Product.create({
      product_name,
      category,
      company_name,
      price,
      description,
      quantity,
      // product_image
    });

    res.status(201).json({ Success: true, data: product });
  } catch (error) {
    console.log("error",error);
    res.status(500).json({ Success: false, message: "Something went wrong" });
  }
};

//@desc Get product
//@route GET /api/products/:id
//@access public
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({Success:false,message:"Product not found"})
    }
    res.status(200).json({ Success: true, data: product });
  } catch (error) {
    res.status(500).json({ Success: false, message: "Something went wrong" });
  }
};

//@desc Update product
//@route PUT /api/products/:id
//@access private
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({Success:false,message:"Product not found"})
    }
  

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({ Success: true, message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ Success: false, message: "Something went wrong" });
  }
};

//@desc Delete product
//@route DELETE /api/products/:id
//@access private
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({Success:false,message:"Product not found"});
    }
  
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({ Success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ Success: false, message: "Something went wrong" });
    
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
