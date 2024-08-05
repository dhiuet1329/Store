import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCart = async (req, res, next) => {
  try {
    console.log("getCart");
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const userId = req.userId._id;
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    //neu chua co cart thi tao cart, co cart thi them sp vao cart
    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, products: [], totalPrice: 0 });
    console.log(cart);
    const productIndex = cart.products.findIndex(
      (item) => (item.product = productId)
    );
    if (productIndex === -1) {
      // Nếu sản phẩm chưa có trong cart.products thì push sản phẩm vào cart.product kèm theo quantity
      cart.products.push({ product: productId, quantity });
    } else {
      console.log(cart);
      cart.products[productIndex].quantity += quantity;
    }
    cart.totalPrice += product.price * quantity;
    console.log(cart);
    await cart.save();
    return res.status(200).json({
      message: "addToCart thành công",
      cart,
    });
  } catch (error) {
    next(error);
  }
};
export const removeFormCart = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
export const checkout = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
