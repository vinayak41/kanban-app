import React from "react";
import "./card.css";
import { Draggable } from "react-beautiful-dnd";
import { VscEdit } from "react-icons/vsc";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { openNameEditor } from "../../../redux/actions/cardActions";
import { Link, useLocation } from "react-router-dom";

const Card = ({ card, index, listId }) => {
  let location = useLocation();
  const cardRef = useRef();
  const dispatch = useDispatch();
  const handleOpenCardNameEditor = (e) => {
    e.stopPropogation()
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
          <Link
            to={`/boards/6384fac29a2c73d340a85d02/${card.id}`}
            state={{ background: location }}
            className="link"
          >
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
          </Link>
        );
      }}
    </Draggable>
  );
};

export default Card;
