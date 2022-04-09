import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Typography } from "antd";
import Card from "../card/Card";


const CardsContainer = ({ listId, cards, title }) => {
  const { Title } = Typography;

  return (
    <Droppable droppableId={listId} type="card" direction="vertical">
      {(provided) => {
        return (
          <>
          <div
            className="cards-container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <Title level={5}>{title}</Title>
            {cards.map((card, index) => (
              <Card key={card._id} card={card} listId={listId} index={index} />
            ))}
          </div>
          {provided.placeholder}
          </>
        );
      }}
    </Droppable>
  );
};

export default CardsContainer;
