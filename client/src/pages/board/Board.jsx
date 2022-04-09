import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBoard,
  updateCardPosition,
  updateListPositon,
} from "../../redux/actions/boardActions";
import { Typography } from "antd";
import "./board.css";
import bgImages from "../../assets/backgroundImages/bgImages";
import AddList from "../../components/board/addList/AddList";
import List from "../../components/board/list/List";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { object_equals } from "../../utils/helper";
import { comparePosition } from "../../utils/list";
import CardTitleEditor from "../../components/board/cardTitleEditor/CardTitleEditor";

const Board = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);
  const { Title } = Typography;

  const { nameEditor } = useSelector((state) => state.card);


  //sort list and cards according position
  const lists = board?.lists
    ?.sort(comparePosition)
    .map((list) => ({ ...list, cards: list.cards.sort(comparePosition) }));

  const moveList = (sourceIndex, destinationIndex, draggableId) => {
    let newPosition;
    if (destinationIndex === lists.length - 1) {
      //last position
      newPosition = lists[destinationIndex].position + 100;
    } else if (destinationIndex === 0) {
      //first position
      newPosition = lists[0].position / 2;
    } else {
      //postion anywhere between first and last
      if (sourceIndex < destinationIndex) {
        //move forward
        newPosition =
          (lists[destinationIndex].position +
            lists[destinationIndex + 1].position) /
          2;
      } else {
        //move backward
        newPosition =
          (lists[destinationIndex].position +
            lists[destinationIndex - 1].position) /
          2;
      }
    }
    dispatch(updateListPositon(draggableId, newPosition));
  };

  const moveCard = (source, destination, draggableId) => {
    const destinationList = lists.find(
      (list) => list._id === destination.droppableId
    );
    let newPosition;
    if (destinationList.cards.length === 0) {
      //move card in empty list
      newPosition = 1000;
    } else if (destination.index === 0) {
      //move at position first in list
      newPosition = destinationList.cards[0].position / 2;
    } else if (destination.index >= destinationList.cards.length) {
      //move at last position in list
      newPosition =
        destinationList.cards[destinationList.cards.length - 1].position + 100;
    } else {
      //move card anywhere between first and last position
      newPosition =
        (destinationList.cards[destination.index].position +
          destinationList.cards[destination.index - 1].position) /
        2;
    }
    dispatch(
      updateCardPosition(
        draggableId,
        source.droppableId,
        destination.droppableId,
        newPosition
      )
    );
  };

  const handleDragEnd = ({ destination, source, type, draggableId }) => {
    if (destination && source && !object_equals(destination, source)) {
      if (type === "list") {
        moveList(source.index, destination.index, draggableId);
      } else if (type === "card") {
        moveCard(source, destination, draggableId);
      }
    }
  };

  useEffect(() => {
    dispatch(getBoard(params.boardId));
  }, []);

  return (
    <>
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
                      bgImages.find(
                        (image) => image.id == board.background.image
                      )?.src
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
                      {lists.map((list, index) => (
                        <List key={list._id} list={list} index={index} />
                      ))}
                      {/* {provided.placeholder} */}
                      <AddList
                        boardId={params.boardId}
                        //for first list position will be 1000
                        //otherwise position for new list will be postion of previous list + 100
                        position={
                          !lists.length
                            ? 1000
                            : lists[lists.length - 1].position + 100
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
      <CardTitleEditor
        isOpen={nameEditor.isOpen}
        card={nameEditor.card}
        position={nameEditor.position}
      />
    </>
  );
};

export default Board;
