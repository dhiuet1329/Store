import { Product } from "./../interfaces/Product";

type State = {
  products: Product[];
};
type Action = {
  type: string;
  payload: string | number;
};
const productReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: Array.isArray(action.payload) ? action.payload : [],
      };
    case "ADD_PRODUCT":
      if (typeof action.payload === "object" && "_id" in action.payload) {
        return {
          ...state,
          products: Array.isArray(state.products)
            ? [...state.products, action.payload as Product]
            : [action.payload as Product],
        };
      } else {
        return state;
      }
      break;
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) => {
          if (typeof action.payload === "object" && "_id" in action.payload) {
            const payload = action.payload as { _id: string };
            return product._id === payload._id ? action.payload : product;
          }
          return product;
        }),
      };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
export default productReducer;
