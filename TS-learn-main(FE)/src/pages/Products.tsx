// import React from 'react'

import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { useShoppingContext } from "../contexts/ShoppingContext";
import { User } from "../interfaces/User";

const Products = () => {
  const { state } = useContext(ProductContext);
  const { addCartItem } = useShoppingContext();
  const [user, setUser] = useState({} as User);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(user);
    console.log(!!user);
  }, []);
  return (
    <div className="row mt-3 g-4">
      {state.products?.map((item) => (
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={item._id}>
          <div className="card">
            <img src={item.thumbnail} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">${item.price}</p>
              <a
                href="#"
                className="btn btn-sm btn-danger"
                onClick={
                  user.email
                    ? () => addCartItem(item)
                    : () => alert("Bạn phải đăng nhập để mua hàng")
                }
              >
                <i className="fa fa-shopping-cart"></i>
                Add to cart
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
