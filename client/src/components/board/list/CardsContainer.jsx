import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Input, Typography } from "antd";
import Card from "../card/Card";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateListTitle } from "../../../redux/actions/boardActions";

const CardsContainer = ({ listId, cards, title }) => {
  const dispatch = useDispatch();
  const { Title } = Typography;
  const [isTitleEditorActive, setIsTitileEditorActive] = useState(false);
  const [listTitle, setListTitle] = useState(title);

  const handleNoteTitleChange = (event) => {
    setListTitle(event.target.value);
  };

  const saveTitle = () => {
    if (title !== listTitle) {
      dispatch(updateListTitle({ id: listId, title: listTitle }));
    }
    setIsTitileEditorActive(false);
  };

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
              <Input
                value={listTitle}
                className={`listTitle ${isTitleEditorActive ? "active" : ""}`}
                onChange={handleNoteTitleChange}
                onFocus={() => setIsTitileEditorActive(true)}
                onBlur={saveTitle}
              />
              {cards.map((card, index) => (
                <Card
                  key={card.id}
                  card={card}
                  listId={listId}
                  index={index}
                />
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
