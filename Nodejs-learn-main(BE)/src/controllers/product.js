import Product from "../models/product.js";

export const createProduct = async (req, res, next) => {
  try {
    const data = await Product.create(req.body);
    if (data) {
      res.status(201).json({
        success: true,
        data,
        message: "Create successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};
export const getAllProduct = async (req, res) => {
  try {
    const data = await Product.find();
    if (data) {
      res.status(201).json({
        success: true,
        data,
        message: "Get products successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};
export const getOneProduct = async (req, res, next) => {
  try {
    const data = await Product.findOne({ _id: req.params.id });
    if (data) {
      res.status(201).json({
        success: true,
        data,
        message: "Get product successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const data = await Product.findOneAndDelete({ _id: req.params.id });
    if (data) {
      res.status(201).json({
        success: true,
        data,
        message: "delete product successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};
export const updateProduct = async (req, res) => {
  try {
    const data = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (data) {
      res.status(201).json({
        success: true,
        data,
        message: "update product successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};
