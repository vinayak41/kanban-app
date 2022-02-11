import React, { useState } from "react";
import { Modal, Button, Input, Typography } from "antd";
import { default as logo } from "../../assets/board-preview-skeleton.svg";
import "./createNewBoard.css";
import bgImages from "../../assets/backgroundImages/bgImages";
import { GrFormCheckmark } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { createBoard } from "../../redux/actions/boardActions";

const bgColorOptions = ["#0079BF", "#D29034", "#519839", "#B04733", "#89619F"];

const CreateNewBoard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");
  const [background, setBackground] = useState({ image: 1, color: false });
  const dispatch = useDispatch();

  const { Text } = Typography;

  const handleBoardTitleChange = (event) => {
    setBoardTitle(event.target.value);
  };

  const handleBackgroundChange = (value) => {
    setBackground(value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    dispatch(createBoard({ title: boardTitle, background}));
    setBoardTitle("")
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create New Board
      </Button>
      <Modal
        title="Create Board"
        visible={isModalVisible}
        okText="Save"
        okButtonProps={{
          disabled: !Boolean(boardTitle),
        }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div
          className="board-preview"
          style={
            background?.image
              ? {
                  backgroundImage: `url(${
                    bgImages.find((image) => image.id == background.image)?.src
                  })`,
                }
              : { backgroundColor: background.color }
          }
        >
          <img src={logo} />
        </div>
        <div className="background-options">
          <div className="background-images">
            {bgImages.map((image) => (
              <div
                key={image.id}
                className="bg-image-container"
                style={{
                  backgroundImage: `url(${
                    bgImages.find((_image) => _image.id == image.id)?.src
                  })`,
                }}
                onClick={() =>
                  handleBackgroundChange({ image: image.id, color: false })
                }
              >
                {background.image === image.id ? (
                  <div className="selected">
                    <GrFormCheckmark className="check-mark" size={20} />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <div className="background-colors">
            {bgColorOptions.map((color) => (
              <div
                key={color}
                className="bg-color-container"
                style={{ backgroundColor: color }}
                onClick={() => handleBackgroundChange({ image: false, color })}
              >
                {background.color === color ? (
                  <GrFormCheckmark className="check-mark" size={20} />
                ) : null}
              </div>
            ))}
          </div>

          <div className="board-title-input-wrapper">
            <Text strong>
              Board Title <span style={{ color: "red" }}>*</span>
            </Text>
            <Input
              placeholder="Board title"
              onChange={handleBoardTitleChange}
              autoFocus={true}
              value={boardTitle}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateNewBoard;
