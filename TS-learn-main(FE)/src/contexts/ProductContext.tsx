import { createContext, useEffect, useReducer } from "react";
import { Product } from "../interfaces/Product";
import productReducer from "../reducers/productReducer";
import instance from "../axios";

export type ProductContextType = {
  state: { products: Product[] };
  dispatch: React.Dispatch<string>;
  removeProduct: (id: string | number | undefined) => void;
  handleProduct: (product: Product) => void;
};
export const ProductContext = createContext({} as ProductContextType);
const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, { products: [] });

  useEffect(() => {
    (async () => {
      const { data } = await instance.get("/products");
      dispatch({ type: "GET_PRODUCTS", payload: data.data });
    })();
  }, []);
  const removeProduct = async (id: string | number | undefined) => {
    try {
      await instance.delete(`/products/${id}`);
      dispatch({ type: "REMOVE_PRODUCT", payload: id });
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
      } else {
        const { data } = await instance.post("/products", product);
        dispatch({ type: "ADD_PRODUCT", payload: data.data });
      }
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
