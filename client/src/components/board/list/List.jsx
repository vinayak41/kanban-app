import React from "react";
import { Typography } from "antd";
import "./list.css";
import AddCard from "../addCard/AddCard";
import Card from "../card/Card";

const List = ({ list }) => {
  const { Title } = Typography;

  return (
    <div className="list">
      <Title level={5}>{list.title}</Title>
      <div className="cards-container">
        {list.cards.map((card) => (
          <Card key={card._id} card={card} />
        ))}
      </div>
      <AddCard listId={list._id} index={list.cards.length} />
    </div>
  );
};

export default List;
