const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const client = require("./config.js");
const getItems = require("./routes/getItems.js");
const cors = require("cors");
const login = require("./routes/login.js")
const signup = require("./routes/signup.js")
const userLoginCheck = require("./routes/userLoginCheck.js")
const cookieParser = require("cookie-parser");
const logout = require("./routes/logout.js");
const addItemToCart = require("./routes/addItem.js");
const getUserCartItem = require("./routes/getUserCartItem.js")
const deleteItemFromCart = require("./routes/deleteItemFromCart.js");
const cartItemQuantiyUpdate = require("./routes/cartItemQuantiyUpdate.js");

dotenv.config();

const app = express();

app.use(cors({
    credentials: true,
    origin: 'https://astonishing-muffin-6d5e53.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))

// app.get('/', async (req, res) => {
//     const result = await client.query(`SELECT * FROM items`);
//     res.status(200).json(result.rows);
// })

app.use('/api', getItems);
app.use('/api', login);
app.use('/api', signup);
app.use('/api', userLoginCheck);
app.use('/api', logout);
app.use('/api', addItemToCart);
app.use('/api', getUserCartItem);
app.use('/api', deleteItemFromCart);
app.use('/api', cartItemQuantiyUpdate);


const port = process.env.PORT || 3201;

app.listen(port, (err) => {
    if(err){
        console.log(err);
    }
    console.log(`Server is running on port ${port}`);
})