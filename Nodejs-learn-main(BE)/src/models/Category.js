import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      defaultValue: "UnCategorized",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      defaultValue: "uncategorized",
    },
    description: String,
    products: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
export default mongoose.model("Category", categorySchema);
