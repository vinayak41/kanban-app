require("dotenv").config();

const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rfrff31.mongodb.net/?retryWrites=true&w=majority&ssl=true`;
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = { MONGODB_URI, PORT, JWT_SECRET };
