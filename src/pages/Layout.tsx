import { Outlet } from "react-router-dom";
import React from "react";
import CustomizedBreadcrumbs from "../components/CustomizedBreadcrumbs";

const Layout = () => {
  return (
    <>
      <CustomizedBreadcrumbs />
      <Outlet />
    </>
  );
};

export default Layout;
