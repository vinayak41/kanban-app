import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import styles from "./cardDetail.module.css";
import { BsCardHeading } from "react-icons/bs";
import { GrTextAlignFull } from "react-icons/gr";
import { CgClose } from "react-icons/cg";
import { Form, Input } from "antd";
import useService from "@hooks/useService";
import { getCard } from "services/card";
import Loading from "@components/Loading";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCard } from "@redux/actions/cardActions";
const { TextArea } = Input;

const CardDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [card, setCard] = useState();
  const { cardId } = useParams();
  const { loading, response: cardResponse } = useService(getCard, cardId);

  useEffect(() => {
    if (cardResponse) setCard(cardResponse);
  }, [cardResponse]);

  const { title, description, list } = card || {};

  const handleCardUpdate = (data) => {
    dispatch(updateCard({ id: card.id, ...data }));
  };

  return (
    <div className={styles.modal}>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.content}>
          <button onClick={() => navigate(-1)} className={styles.close_button}>
            <CgClose size={18} />
          </button>
          <div className={styles.header}>
            <div>
              <BsCardHeading size={25} />
            </div>
            <div>
              <Input
                onChange={(e) => {
                  setCard((prevState) => ({
                    ...prevState,
                    title: e.target.value,
                  }));
                }}
                value={title}
                className={styles.title_input}
                onBlur={() => handleCardUpdate({ title })}
              />
              <p>In list {list?.title}</p>
            </div>
          </div>
          <div className={styles.description}>
            <div>
              <GrTextAlignFull size={22} />
            </div>
            <div>
              <h3>Description {description}</h3>
              <TextArea
                value={description}
                onChange={(e) =>
                  setCard((prevState) => ({
                    ...prevState,
                    description: e.target.value,
                  }))
                }
                onBlur={() => handleCardUpdate({ description })}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDetail;
