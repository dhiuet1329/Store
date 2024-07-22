import User from "../models/User.js";
import { generateToken } from "../utlis/jwt.js";
import { comparePass, hassPassword } from "../utlis/password.js";
export const register = async (req, res, next) => {
  try {
    /**
     * 1. kiem tra email da ton tai chua
     * 2. ma hoa pass
     * 3. khoi tao user moi
     * 4. thong bao thanh cong
     */
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "Email da ton tai tren he thong",
      });
    }
    const hassPass = hassPassword(password);
    if (!hassPass) {
      return res.status(400).json({ message: "Ma hoa mat khau that bai !" });
    }
    const newUser = await User.create({
      email,
      password: hassPass,
    });
    newUser.password = undefined;
    return res.status(201).json({
      success: true,
      newUser,
      message: "Dang ki thanh cong!",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    /**
     * 1. kiem tra email da ton tai chua
     * 2. giai ma pass
     * 3. generate token
     * 4. thong bao thanh cong
     */
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(404).json({
        message: "Email chua dang ky",
      });
    }
    const isMatch = comparePass(password, userExists.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Mat khau khong dung",
      });
    }

    const token = generateToken({ _id: userExists._id }, "100d");
    userExists.password = undefined;
    return res.status(200).json({
      success: true,
      user: userExists,
      accessToken: token,
      message: "Dang nhap thanh cong",
    });
  } catch (error) {
    next(error);
  }
};
