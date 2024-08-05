import Category from "../models/Category.js";
import Product from "../models/Product.js";

export const createProduct = async (req, res, next) => {
  try {
    const data = await Product.create(req.body);
    console.log(data);
    const updateCategory = await Category.findByIdAndUpdate(
      req.body.category,
      {
        $push: { products: data._id },
      },
      { new: true }
    );
    if (data && updateCategory) {
      return res.status(201).json({
        success: true,
        data,
        message: "Tạo sản phẩm thành công",
      });
    }
  } catch (error) {
    next(error);
  }
};
export const getAllProducts = async (req, res, next) => {
  try {
    const data = await Product.find().populate("category");

    if (data) {
      return res.status(200).json({
        success: true,
        products: data,
        message: "Lấy sản phẩm thàng công",
      });
    }
  } catch (error) {
    next(error);
  }
};
export const getProductById = async (req, res, next) => {
  try {
    const data = await Product.findById(req.params.id).populate("category");
    if (data) {
      return res.status(200).json({
        success: true,
        products: data,
        message: "Tìm sản phẩm thành công",
      });
    }
  } catch (error) {
    next(error);
  }
};
export const removeProduct = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);
    if (data) {
      res.status(200).json({
        success: true,
        data,
        message: "Xóa sản phẩm thành công",
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
        message: "Cập nhật sản phẩm thành công",
      });
    }
  } catch (error) {
    next(error);
  }
};
