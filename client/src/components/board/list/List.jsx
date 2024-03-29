import React from "react";
import { Typography } from "antd";
import "./list.css";
import AddCard from "../addCard/AddCard";
import { Draggable, Droppable } from "react-beautiful-dnd";
import CardsContainer from "./CardsContainer";

const List = ({ list, index }) => {
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => {
        return (
          <div
            className="list"
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <CardsContainer
              title={list.title}
              listId={list.id}
              cards={list.cards}
            />

            <AddCard
              listId={list.id}
              //  postion for first card will be 1000
              //  otherwise it will be postion of previous card + 100
              position={
                list.cards.length
                  ? list.cards[list.cards.length - 1].position + 100
                  : 1000
              }
            />
          </div>
        );
      }}
    </Draggable>
  );
};

export default List;
