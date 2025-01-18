const Pg = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const db = new Pg.Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : undefined,
});

db.connect()
    .then(() => console.log("Connected to postgreSQL"))
    .catch((err) => console.error("Connection error ", err.stack));


module.exports = db;