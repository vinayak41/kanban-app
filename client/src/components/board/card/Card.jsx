import React from "react";
import "./card.css";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ card, index }) => {
  return (
    <Draggable draggableId={card._id} index={index}>
      {(provided) => {
        return (
          <div
            className="card"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {card.title}
          </div>
        );
      }}
    </Draggable>
  );
};

export default Card;
