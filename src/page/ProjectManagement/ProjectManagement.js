import React from "react";
import "../StyleJira/styleJira.css";
import { Input, Space, Button } from "antd";

import DashBroad from "./DashBroad";

// Search Module
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

let ProjectManagement = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {/* Header */}
      <p className="font-sans head__title">Kanban board</p>
      <div className="flex">
        <Space direction="vertical">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            size="large"
            style={{ width: 300, height: "42px" }}
          />
        </Space>
        <div
          className="user__assign"
          style={{ width: "150px", height: "42px", marginRight: "10px" }}
        ></div>
        <div className="issues__task">
          <Button
            style={{ width: "150px", height: "42px", marginRight: "10px" }}
          >
            Recently updated
          </Button>
          <Button style={{ width: "150px", height: "42px" }}>
            Only My Issues
          </Button>
        </div>
      </div>
      {/* Contents */}
      <div className="content__container mt-7">
        <DashBroad />
      </div>
    </div>
  );
};

export default ProjectManagement;
