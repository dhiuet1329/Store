// import React from "react";

import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  ProductContext,
  ProductContextType,
} from "../../contexts/ProductContext";

const Dashboard = () => {
  const { state, removeProduct } = useContext(
    ProductContext
  ) as ProductContextType;

  return (
    <>
      <div className="d-flex flex-row-reverse bd-highlight">
        <Link to={"/admin/product-add"} className="btn btn-primary">
          Add new products
        </Link>
      </div>
      <table className="table table-bordered table-rounded">
        <thead className="table-dark">
          <tr className="text-center">
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Thumbnail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {state.products.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>
                <img src={item.thumbnail} width={100} />
              </td>
              <td>
                <Link
                  to={`/admin/product-update/${item._id}`}
                  className="btn btn-warning"
                >
                  Update
                </Link>
                <button
                  onClick={() => removeProduct(item._id)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Dashboard;
