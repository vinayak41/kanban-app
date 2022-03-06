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

const updateCard = async (req, res, next) => {
  try {
    const cardId = req.params.cardId;
    const sourceListId = req.body.sourceListId;
    const destinationListId = req.body.destinationListId;
    await Card.findByIdAndUpdate(cardId, {
      $set: { position: req.body.position, list: destinationListId },
    });

    await List.findByIdAndUpdate(destinationListId, {
      $push: { cards: cardId },
    });

    await List.findByIdAndUpdate(sourceListId, { $pull: { cards: cardId } });

    res.json({ message: "ok" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createCard, updateCard };
