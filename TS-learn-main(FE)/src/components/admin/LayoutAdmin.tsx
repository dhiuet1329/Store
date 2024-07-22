// import React from 'react'

import { Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import SideBar from "./SideBar";

const LayoutAdmin = () => {
  const { user } = useAuth();
  console.log(user);
  if (!user || user.role !== "admin") {
    return <h1>Bạn không đủ quyền vào trang này !</h1>;
  }
  return (
    <>
      <div id="wrapper-bgr">
        <div className="wrapper">
          <div
            className="sidebar"
            data-background-color="white"
            data-active-color="danger"
          >
            <SideBar />
          </div>
          <div className="main-panel">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutAdmin;
