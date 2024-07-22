// import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { User } from "../interfaces/User";
import instance from "../axios";
import { loginSchema, registerSchema } from "../utils/validation";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

type Progs = {
  isLogin?: boolean;
};
const AuthForm = ({ isLogin }: Progs) => {
  const nav = useNavigate();
  const { login: contextLogin, isAdmin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });
  const onSubmit = (user: User) => {
    (async () => {
      try {
        if (isLogin) {
          const res = await instance.post(`/user/login`, user);
          contextLogin(res.data.accessToken, res.data.user);
          // console.log(res);
          if (confirm("Đăng nhập thành công")) {
            nav(res.data.user.role === "admin" ? "/admin" : "/");
          }
        } else {
          const res = await instance.post(`/user/register`, {
            email: user.email,
            password: user.password,
          });
          if (confirm("Đăng ký thành công")) {
            nav("/login");
          }
          alert(res.data.message);
        }
      } catch (error: any) {
        console.log(error);
        alert(error.response?.data?.message || "Có lỗi xảy ra");
      }
    })();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1> {isLogin ? "Đăng nhập" : "Đăng ký"} </h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            email
          </label>
          <input
            type="email"
            className="form-control"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            password
          </label>
          <input
            type="password"
            className="form-control"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
        {!isLogin && (
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              confirmPassword
            </label>
            <input
              type="password"
              className="form-control"
              {...register("confirmPassword", { required: true })}
            />
            {errors.confirmPassword && (
              <p className="text-danger">{errors.confirmPassword.message}</p>
            )}
          </div>
        )}

        <div className="mb-3">
          <button type="submit" className="btn btn-primary w-100">
            {isLogin ? "Đăng nhap" : "Đăng ký"}
          </button>
        </div>
        <div className="mb-3">
          {isLogin ? (
            <Link className="btn btn-info" to="/register">
              Tạo tài khoản mới
            </Link>
          ) : (
            <Link className="btn btn-danger" to="/login">
              Đã có tài khoản - Đăng nhập
            </Link>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
