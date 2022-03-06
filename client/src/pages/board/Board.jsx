import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBoard, updateListPositon } from "../../redux/actions/boardActions";
import { Typography } from "antd";
import "./board.css";
import bgImages from "../../assets/backgroundImages/bgImages";
import AddList from "../../components/board/addList/AddList";
import List from "../../components/board/list/List";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { object_equals } from "../../utils/helper";
import { comparePosition } from "../../utils/list";

const Board = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);
  const { Title } = Typography;

  const moveList = (sourceIndex, destinationIndex, draggableId) => {
    let newPosition;
    console.log(destinationIndex, draggableId);
    // const sourceCard = board.lists[sourceIndex];
    // const destinationCard = board.lists[destinationIndex];

    if (destinationIndex === board.lists.length - 1) {
      //last position
      newPosition = board.lists[destinationIndex].position + 100;
    } else if (destinationIndex === 0) {
      //first position
      newPosition = board.lists[0].position / 2;
    } else {
      //postion anywhere between first and last
      if (sourceIndex < destinationIndex) {
        //move forward
        newPosition =
          (board.lists[destinationIndex].position +
            board.lists[destinationIndex + 1].position) /
          2;
      } else {
        //move backward
        newPosition =
          (board.lists[destinationIndex].position +
            board.lists[destinationIndex - 1].position) /
          2;
      }
    }
    console.log(newPosition);
    dispatch(updateListPositon(draggableId, newPosition))
  };

  const handleDragEnd = ({ destination, source, type, draggableId }) => {
    if (destination && source && !object_equals(destination, source)) {
      if (type === "list") {
        console.log("move list");
        moveList(source.index, destination.index, draggableId);
      } else if (type === "card") {
        console.log("move card");
      }
    }
  };

  useEffect(() => {
    dispatch(getBoard(params.boardId));
  }, []);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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
          <Title className="board-title" level={2}>
            {board.title}
          </Title>
          <Droppable droppableId="board" type="list" direction="horizontal">
            {(provided) => {
              return (
                <>
                  <div
                    className="lists-container"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {board.lists.sort(comparePosition).map((list, index) => (
                      <List key={list._id} list={list} index={index} />
                    ))}
                    {/* {provided.placeholder} */}
                    <AddList
                      boardId={params.boardId}
                      //for first list position will be 1000
                      //otherwise position for new list will be postion of previous list + 100
                      position={
                        !board.lists.length
                          ? 1000
                          : board.lists[board.lists.length - 1].position + 100
                      }
                    />
                  </div>
                  {provided.placeholder}
                </>
              );
            }}
          </Droppable>
        </div>
      )}
    </DragDropContext>
  );
};

export default Board;
