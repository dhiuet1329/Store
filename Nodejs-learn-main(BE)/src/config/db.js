import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/mydb_xuongnodeJS");
    console.log("db connected!");
  } catch (error) {
    console.log(error);
  }
};
