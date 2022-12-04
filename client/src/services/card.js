import request from "./request"

export const getCard = async (cardId) => {
  const res = await request.get(`/api/cards/${cardId}`);
  return res.data;
};
