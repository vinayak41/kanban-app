import React from "react";
import "./card.css";
import { Draggable } from "react-beautiful-dnd";
import { VscEdit } from "react-icons/vsc";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { openNameEditor } from "../../../redux/actions/cardActions";

const Card = ({ card, index, listId }) => {
  const cardRef = useRef();
  const dispatch = useDispatch();
  const handleOpenCardNameEditor = () => {
    const { left, top } = cardRef.current.getBoundingClientRect();
    dispatch(
      openNameEditor({
        card: { title: card.title, id: card.id, listId: listId },
        position: { top, left },
      })
    );
  };
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => {
        return (
          <div
            className="card"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div ref={cardRef}>
              {card.title}
              <VscEdit
                className="editIcon"
                onClick={handleOpenCardNameEditor}
              />
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Card;
