import React from "react";
import { Typography } from "antd";
import "./list.css"

const List = ({ list }) => {
  const { Title } = Typography;

  return (
    <div className="list">
      <Title level={5}>{list.title}</Title>
    </div>
  );
};

export default List;
