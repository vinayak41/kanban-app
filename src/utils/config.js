require("dotenv").config();

const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rfrff31.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&ssl=true`;
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const DB_NAME = process.env.DB_NAME;

module.exports = { MONGODB_URI, PORT, JWT_SECRET, DB_NAME };
