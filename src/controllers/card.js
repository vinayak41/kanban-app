const Card = require("../models/card");
const List = require("../models/list");

const getCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId).populate("list", { title: 1 });
    return res.json(card);
  } catch (error) {
    next(error);
  }
};

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
    const { position } = req.body;

    console.log(req.body);

    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      {
        $set: {
          ...req.body,
          list: destinationListId,
        },
      },
      { new: true }
    );

    if (position) {
      await List.findByIdAndUpdate(sourceListId, { $pull: { cards: cardId } });
      await List.findByIdAndUpdate(destinationListId, {
        $push: { cards: cardId },
      });
    }

    res.json({ message: "ok", data: updatedCard });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getCard, createCard, updateCard };
