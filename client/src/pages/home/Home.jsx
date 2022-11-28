import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "antd";
import "./home.css";
import { generateGreetings } from "../../utils/helper";
import CreateNewBoard from "../../components/createNewBoard/CreateNewBoard";
import { getAllBoards } from "../../redux/actions/boardActions";
import bgImages from "../../assets/backgroundImages/bgImages";
import { Link } from "react-router-dom";

const Home = () => {
  const { Title, Paragraph } = Typography;
  const { fullname } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const allBoards = useSelector((state) => state.boards);

  useEffect(() => {
    dispatch(getAllBoards());
  }, []);

  return (
    <div className="home-container">
      <Title type="h1">Kanban</Title>
      <Paragraph>{`${generateGreetings()} ${
        fullname?.split(" ")[0]
      }!`}</Paragraph>
      <CreateNewBoard />
      <Title level={4} style={{ marginTop: "1rem" }}>
        Your boards
      </Title>
      <div className="your-boards">
        {allBoards?.map((board) => (
          <Link to={`/boards/${board.id}`} key={board.id}>
            <div
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
