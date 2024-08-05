// import React from 'react'

import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div id="sidebar">
      <div className="top">
        <img src="https://theme.hstatic.net/200000378371/1001142643/14/logo.png?v=561" />
        <i className="bx bx-menu" id="btn"></i>
      </div>
      <div className="user">
        <img
          src="https://mka.com.vn/wp-content/uploads/2023/02/31.jpeg"
          alt="me"
          className="user-img"
        />
        <div>
          <p>Meo Meo</p>
          <p>Admin</p>
        </div>
      </div>
      <ul className="list-unstyled component m-0">
        <li className="active">
          <i className="bx bx-grid-alt"></i>
          <Link to="/admin">Dashboard</Link>
          <span className="tooltip">Dashboard</span>
        </li>
        <li className="active">
          <i className="bx bx-grid-alt"></i>
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
