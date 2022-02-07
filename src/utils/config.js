require("dotenv").config();

const MONGODB_URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-shard-00-00.yj5lf.mongodb.net:27017,cluster0-shard-00-01.yj5lf.mongodb.net:27017,cluster0-shard-00-02.yj5lf.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-hjxpn8-shard-0&authSource=admin&retryWrites=true&w=majority`;
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = { MONGODB_URI, PORT, JWT_SECRET };
