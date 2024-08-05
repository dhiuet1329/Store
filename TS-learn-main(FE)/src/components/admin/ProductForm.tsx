/* eslint-disable react-hooks/rules-of-hooks */
// import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "../../interfaces/Product";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import instance from "../../axios";
import { productSchema } from "../../utils/validation";
import {
  ProductContext,
  ProductContextType,
} from "../../contexts/ProductContext";
import { Category } from "../../interfaces/Category";

const ProductForm = () => {
  const { handleProduct } = useContext(ProductContext) as ProductContextType;
  const [categories, setCategories] = useState<Category[]>([]);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
  });
  if (id) {
    useEffect(() => {
      (async () => {
        const { data } = await instance.get(`products/${id}`);
        reset(data.data);
      })();
    }, [id, reset]);
  }
  useEffect(() => {
    (async () => {
      const { data } = await instance.get(`/categories`);
      setCategories(data.data);
    })();
  }, []);
  return (
    <div>
      <form
        onSubmit={handleSubmit((data) =>
          handleProduct({ ...data, _id: id ?? "" })
        )}
      >
        <h1>{id ? "Update product" : "Add new product"}</h1>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            title
          </label>
          <input
            type="text"
            className="form-control"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <p className="text-danger">{errors.title.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            price
          </label>
          <input
            type="number"
            className="form-control"
            {...register("price", { required: true, valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-danger">{errors.price.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            description
          </label>
          <textarea
            rows={4}
            className="form-control"
            {...register("description", { required: true })}
          />
        </div>
        <div className="mb-3">
          <select {...register("category", { required: true })}>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
