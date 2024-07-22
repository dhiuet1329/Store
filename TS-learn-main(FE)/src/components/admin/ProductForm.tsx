// import React from "react";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import { Product } from "../../interfaces/Product";
import { productSchema } from "../../utils/validation";

const { VITE_CLOUD_NAME, VITE_UPLOAD_PRESET } = import.meta.env;

const ProductForm = () => {
  const { id } = useParams(); //id
  const { dispatch } = useContext(ProductContext);
  const navigate = useNavigate();
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  //state để lưu trữ lựa chon của người dùng
  const [thumbnailOption, setThumbnailOption] = useState("keep");
  // console.log(id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
  });
  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const { data } = await instance.get(`/products/${id}`);
          reset(data);
          setThumbnailUrl(data.thumbnail);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [id, reset]);
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", VITE_UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    console.log(data);
    return data.secure_url;
  };
  const onSubmit = async (product: Product) => {
    try {
      let updatedProduct = { ...product };
      //lựa chọn của admin
      switch (thumbnailOption) {
        case "upload":
          //sử lý upload ảnh nếu admin chọn upload ảnh từ local
          if (product.thumbnail && product.thumbnail[0]) {
            const thumbnailUrl = await uploadImage(product.thumbnail[0]);
            updatedProduct = { ...updatedProduct, thumbnail: thumbnailUrl };
          }
          break;
        default:
          break;
      }
      if (id) {
        //edit
        const { data } = await instance.patch(
          `/products/${id}`,
          updatedProduct
        );
        dispatch({
          type: "UPDATE_PRODUCT",
          payload: { id, product: updatedProduct },
        });
        console.log(data);
      } else {
        //add
        const { data } = await instance.post("/products", updatedProduct);
        dispatch({ type: "ADD_PRODUCT", payload: data });
        console.log(data);
      }
      if (confirm("Successfuly, redirect admin page ?")) {
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{id ? "Edit product" : "Add product"}</h1>
        <div className="form-group mb-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <p className="text-danger">{errors.title.message}</p>
          )}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="title">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            {...register("price", { required: true, valueAsNumber: true })}
          />
        </div>
        {errors.price && <p className="text-danger">{errors.price.message}</p>}
        <div className="form-group mb-3">
          <label htmlFor="title">Description</label>
          <input
            type="text"
            className="form-control"
            id="Description"
            {...register("description")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="thumbnailOption" className="form-label">
            Choose thumbnail option
          </label>
          <select
            className="form-control"
            id="thumbnailOption"
            value={thumbnailOption}
            onChange={(e) => setThumbnailOption(e.target.value)}
          >
            <option value="keep">Keep current thumbnail</option>
            <option value="link">Add thumbnail from link</option>
            <option value="upload">Upload thumbnail from local</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="thumbnail" className="form-label">
            Thumbnail
          </label>
          {thumbnailOption === "link" && (
            <input
              type="text"
              className="form-control"
              id="thumbnail"
              {...register("thumbnail")}
            />
          )}
          {thumbnailOption === "upload" && (
            <input
              type="file"
              className="form-control"
              id="thumbnail"
              {...register("thumbnail", { required: true })}
            />
          )}
          {errors.thumbnail?.message && (
            <p className="text-danger">{errors.thumbnail?.message}</p>
          )}
          {thumbnailUrl && (
            <img
              src={thumbnailUrl}
              alt="Product thumbnail"
              style={{ maxWidth: "200px", marginTop: "10px" }}
            />
          )}
        </div>
        <div className="form-group mb-3">
          <button className=" btn btn-primary">
            {id ? "Edit product" : "Add product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
