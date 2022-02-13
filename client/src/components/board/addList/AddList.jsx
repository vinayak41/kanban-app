import React, { useState } from "react";
import "./addList.css";
import { IoMdAdd } from "react-icons/io";
import { Input, Button } from "antd";
import { CgClose } from "react-icons/CG";
import { useDispatch } from "react-redux";
import { createList } from "../../../redux/actions/boardActions";

const AddList = ({ boardId, index }) => {
  console.log({ boardId, index });
  const [active, setActive] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const dispatch = useDispatch();
  const handleButtonClick = () => {
    setActive(true);
  };
  const handleClose = () => {
    setActive(false);
  };
  const handleAddList = () => {
    if (listTitle) {
      dispatch(createList({title: listTitle, index, boardId}))
      setListTitle("")
      handleClose();
    }
  };

  const handleListTitleChange = (event) => {
    setListTitle(event.target.value);
  };
  return (
    <>
      {!active ? (
        <div onClick={handleButtonClick} className="add-list-button">
          <IoMdAdd /> Add list
        </div>
      ) : (
        <div className="add-list-form">
          <Input autoFocus onChange={handleListTitleChange} value={listTitle} />
          <Button
            type="primary"
            style={{ marginTop: "5px", borderRadius: "3px" }}
            onClick={handleAddList}
          >
            Add List
          </Button>
          <Button className="close-button" onClick={handleClose}>
            <CgClose size={18} />
          </Button>
        </div>
      )}
    </>
  );
};

export default AddList;
