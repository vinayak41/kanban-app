import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Input, Button } from "antd";
import { CgClose } from "react-icons/cg";
import { useDispatch } from "react-redux";
import "./addCard.css";
import { createCard } from "../../../redux/actions/boardActions";

const AddCard = ({ listId, position }) => {
  const [active, setActive] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  const dispatch = useDispatch();
  const handleButtonClick = () => {
    setActive(true);
  };
  const handleClose = () => {
    setActive(false);
  };
  const handleAddCard = () => {
    if (cardTitle) {
      dispatch(createCard({ title: cardTitle, listId, position }));
      setCardTitle("");
      handleClose();
    }
  };

  const handleListTitleChange = (event) => {
    setCardTitle(event.target.value);
  };
  return (
    <>
      {!active ? (
        <div onClick={handleButtonClick} className="add-card-button">
          <IoMdAdd /> Add card
        </div>
      ) : (
        <div className="add-card-form">
          <Input autoFocus onChange={handleListTitleChange} value={cardTitle} />
          <Button
            type="primary"
            style={{ marginTop: "5px", borderRadius: "3px" }}
            onClick={handleAddCard}
          >
            Add Card
          </Button>
          <Button className="close-button" onClick={handleClose}>
            <CgClose size={18} />
          </Button>
        </div>
      )}
    </>
  );
};

export default AddCard;
