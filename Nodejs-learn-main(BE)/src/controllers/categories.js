import Category from "../models/Category.js";
import { categorySchema } from "../validSchema/categorySchema.js";
import Product from "../models/Product.js";
import slugify from "slugify";
export const getAll = async (req, res, next) => {
  try {
    const data = await Category.find();

    if (data) {
      return res.status(200).json({
        success: true,
        datas: data,

        message: "Lấy danh mục thành công",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const data = await Category.findById(req.params.id).populate("products");

    if (data) {
      return res.status(200).json({
        success: true,
        data,
        message: "Tìm danh mục thành công",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const slug = slugify(req.body.title, {
      replacement: "-",
      lower: true,
      strict: true,
      locale: "vi",
      trim: true,
    });
    console.log(slug);
    const { data } = await Category.create({ ...req.body, slug });
    if (data) {
      return res.status(201).json({
        success: true,
        data,
        message: "Tạo danh mục thành công",
      });
    }
  } catch (error) {
    next(error);
  }
};
export const updateCategoryById = async (req, res, next) => {
  try {
    const data = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (data) {
      return res.status(201).json({
        success: true,
        data,
        message: "Update danh mục thành công",
      });
    }
  } catch (error) {
    next(error);
  }
};
export const removeCategoryById = async (req, res, next) => {
  try {
    if (req.param.id === "669bcb968047427de4464cee") {
      return res.status(400).json({
        message: "Không xóa được danh mục mặc định",
        success: false,
      });
    }
    const data = await Category.findByIdAndDelete(req.params.id);
    //  Chuyển toàn bộ sản phẩm thuộc danh mục bị xoá về danh mục mặc định
    const productToUpdate = await Product.find({ category: req.params.id });
    await Promise.all(
      productToUpdate.map(async (product) => {
        product.category = "669bcb968047427de4464cee";
        await product.save();
      })
    );

    if (data) {
      return res.status(200).json({
        success: true,
        data,
        message: "Xóa danh mục thành công",
      });
    }
  } catch (error) {
    next(error);
  }
};
