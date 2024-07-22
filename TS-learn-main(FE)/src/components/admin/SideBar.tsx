// import React from 'react'

import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div id="sidebar">
      <div className="sidebar-header">
        <h3>
          <img src="" className="img-fluid" />
          <span>React</span>
        </h3>
      </div>
      <ul className="list-unstyled component m-0">
        <li className="active">
          <Link to="/admin">Dashboard</Link>
        </li>
        <li className="active">
          <Link to="/admin/user">User</Link>
        </li>
        <li className="active">
          <Link to="/admin/products">Product</Link>
        </li>
        <li className="active">
          <Link to="/admin/categories">Categories</Link>
        </li>
        <li className="active">
          <Link to="/admin/brands">Brands</Link>
        </li>
        <li className="active">
          <Link to="/hosts">Quản lí host</Link>
        </li>
        <li className="active">
          <Link to="/">Xem thông kê</Link>
        </li>
      </ul>
    </div>
  );
}
