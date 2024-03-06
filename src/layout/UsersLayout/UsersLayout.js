import React from "react";
import { FloatButton } from "antd";
import SideBar from "../../component/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../../page/Breadcrums/Breadcrums";
import TopBar from "../../component/TopBar/TopBar";

let UsersLayout = () => {
  const location = useLocation();
  const paths = [
    { label: "Dashboard", url: "/" },
    { label: "Your Page", url: location.pathname },
  ];
  return (
    <>
      <TopBar />

      <div className="flex items-start home__layout">
        <SideBar />
        <div
          className="grow"
          style={{ marginLeft: "40px", marginRight: "40px" }}
        >
          <Breadcrumb paths={paths} />
          <Outlet />
        </div>

        <FloatButton.BackTop />
      </div>
    </>
  );
};

export default UsersLayout;
