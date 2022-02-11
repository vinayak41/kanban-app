import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
    </div>
  );
};

export default Loading;
