const Card = require("../models/card");
const List = require("../models/list");

const createCard = async (req, res, next) => {
  try {
    const newCard = new Card({
      title: req.body.title,
      position: req.body.position,
      createdBy: req.userId,
      list: req.body.listId,
    });
    const savedCard = await newCard.save();

    await List.findByIdAndUpdate(savedCard.list, {
      $push: { cards: savedCard._id },
    });

    return res.json(savedCard);
  } catch (error) {
    next(error);
  }
};

module.exports = { createCard };
