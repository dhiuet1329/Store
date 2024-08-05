import mongoose from "mongoose";

const orderItem = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: Number,
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [orderItem],
  totalPrice: Number,
  voucher: {
    type: String,
    enum: ["sale15", "sale20"],
  },
  status: {
    type: String,
    enum: ["pending", "shipping", "completed", "cancelled"],
    default: "pending",
  },
});

export default mongoose.model("Order", orderSchema);
