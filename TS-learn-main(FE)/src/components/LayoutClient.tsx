// import React from 'react'
import { Outlet } from "react-router-dom";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";

const LayoutClient = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default LayoutClient;
