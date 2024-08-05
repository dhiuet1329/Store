import React, { createContext, useEffect, useReducer } from "react";
import { Product } from "./../interfaces/Product";
import productReducer from "../reducers/productReducer";
import { useNavigate } from "react-router-dom";
import instance from "../axios";

type ProductAction = {
  type: "ADD_PRODUCT" | "REMOVE_PRODUCT";
  payload: string | number;
};
export type ProductContextType = {
  state: { products: Product[] };
  dispatch: React.Dispatch<ProductAction>;
  removeProduct: (id: string | undefined) => void;
  handleProduct: (data: Product) => void;
};

export const ProductContext = createContext({} as ProductContextType);

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, { products: [] });
  const nav = useNavigate();
  useEffect(() => {
    (async () => {
      const { data } = await instance.get("/products");
      // console.log(data);
      dispatch({ type: "GET_PRODUCTS", payload: data.products });
    })();
  }, []);
  const removeProduct = async (id: string | undefined) => {
    try {
      await instance.delete(`/products/${id}`);
      dispatch({ type: "REMOVE_PRODUCT", payload: id as string });
    } catch (error) {
      console.log(error);
    }
  };
  const handleProduct = async (product: Product) => {
    try {
      if (product._id) {
        const { data } = await instance.patch(
          `/products/${product._id}`,
          product
        );
        dispatch({ type: "UPDATE_PRODUCT", payload: data.data });
        alert(data.message);
      }
      nav("/admin");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ProductContext.Provider
      value={{ state, dispatch, removeProduct, handleProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
