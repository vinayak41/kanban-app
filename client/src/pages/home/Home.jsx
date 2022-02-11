import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "antd";
import "./home.css";
import { generateGreetings } from "../../utils/helper";
import CreateNewBoard from "../../components/createNewBoard/CreateNewBoard";
import { getAllBoards } from "../../redux/actions/boardActions";
import bgImages from "../../assets/backgroundImages/bgImages";

const Home = () => {
  const { Title, Paragraph } = Typography;
  const { fullname } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { all: allBoards } = useSelector((state) => state.boards);

  useEffect(() => {
    dispatch(getAllBoards());
  }, []);

  return (
    <div className="home-container">
      <Title type="h1">Kanban</Title>
      <Paragraph>{`${generateGreetings()} ${
        fullname.split(" ")[0]
      }!`}</Paragraph>
      <CreateNewBoard />
      <Title level={4} style={{marginTop: "1rem"}}>Your boards</Title>
      <div className="your-boards">
        {allBoards?.map((board) => (
          <div
            key={board._id}
            className="board"
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
            <Title level={5}>{board.title}</Title>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
