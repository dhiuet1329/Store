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
    <>
      <section className="h-screen">
        <div className="container h-full px-6 py-24">
          <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
            {/* Left column container with background */}
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone image"
              />
            </div>
            {/* Right column container with form */}
            <div className="md:w-8/12 lg:ms-6 lg:w-5/12">
              {isLogin && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* email input */}
                  <div className="relative mb-6" data-twe-input-wrapper-init>
                    <input
                      type="text"
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleFormControlInput3"
                      placeholder="Email address"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                    <label
                      htmlFor="exampleFormControlInput3"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                    >
                      Email address
                    </label>
                  </div>
                  {/* password input */}
                  <div className="relative mb-6" data-twe-input-wrapper-init>
                    <input
                      type="password"
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleFormControlInput33"
                      placeholder="Password"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                    <label
                      htmlFor="exampleFormControlInput33"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                    >
                      Password
                    </label>
                  </div>
                  {/* Remember me checkbox */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
                      <input
                        className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary"
                        type="checkbox"
                        value=""
                        id="exampleCheck3"
                        checked
                      />
                      <label
                        htmlFor="exampleCheck3"
                        className="inline-block ps-[0.15rem] hover:cursor-pointer"
                      >
                        Remember me
                      </label>
                    </div>
                    {/* Forgot password link */}
                    <Link
                      to="/forgot-password"
                      className="text-primary focus:outline-none dark:text-primary-400"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  {/* Submit button */}
                  <button
                    type="submit"
                    className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                  >
                    Sign in
                  </button>
                  {/* Divider  */}
                  <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
                    <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                      OR
                    </p>
                  </div>
                  {/* Social login buttons */}
                  <a
                    href="#"
                    className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                    style={{ backgroundColor: " #3b5998" }}
                    role="button"
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                  >
                    <span className="me-2 fill-white [&>svg]:mx-auto [&>svg]:h-3.5 [&>svg]:w-3.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                      </svg>
                    </span>
                    Continue with Facebook
                  </a>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <h3> {isLogin ? "Đăng nhập" : "Đăng ký"} </h3>
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
      </form> */}
    </>
  );
};

export default AuthForm;
