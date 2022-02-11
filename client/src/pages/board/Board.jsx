import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBoard } from "../../redux/actions/boardActions";
import { Typography } from "antd";
import "./board.css";
import bgImages from "../../assets/backgroundImages/bgImages";
const Board = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);
  const { Title } = Typography;

  console.log(board);
  useEffect(() => {
    dispatch(getBoard(params.boardId));
  }, []);
  return (
    <>
      {!board ? (
        <div className="not-found">
          <Title level={2}>Board not found.</Title>
        </div>
      ) : (
        <div
          className="board-container"
          style={
            board.background?.image
              ? {
                  backgroundImage: `url(${
                    bgImages.find((image) => image.id == board.background.image)
                      ?.src
                  })`,
                }
              : { backgroundColor: board.background.color }
          }
        >
          <Title level={2}>{board.title}</Title>
        </div>
      )}
    </>
  );
};

export default Board;
