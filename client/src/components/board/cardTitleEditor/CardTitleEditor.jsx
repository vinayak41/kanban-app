import { Button, Input } from "antd";
import React from "react";
import "./cardTitleEditor.css";
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import {
  closeCardNameEditor,
  updateCard,
} from "../../../redux/actions/cardActions";
import { useState } from "react";
import { useEffect } from "react";

const CardNameEditor = ({ isOpen, card, position }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  const { TextArea } = Input;

  const closeHandler = () => {
    dispatch(closeCardNameEditor());
  };

  const handleInputChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSave = () => {
    dispatch(updateCard({...card, title}));
    dispatch(closeCardNameEditor())
  };

  useEffect(() => {
    setTitle(card.title);
  }, [card]);

  return (
    <>
      {isOpen && (
        <div className="editorContainer">
          <Button
            className="closeBtn"
            icon={<GrClose />}
            onClick={closeHandler}
          />
          <div
            className="wrapper"
            style={{ top: position.top, left: position.left }}
          >
            <div className="editor">
              <TextArea
                type=""
                defaultValue={card.title}
                onChange={handleInputChange}
              />
            </div>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default CardNameEditor;
