const Pg = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const db = new Pg.Client({
    connectionString: process.env.DB
});

db.connect()
    .then(() => console.log("Connected to postgreSQL"))
    .catch((err) => console.error("Connection error ", err.stack));


module.exports = db;