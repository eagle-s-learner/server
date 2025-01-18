const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const deleteItemFromCart = require("../controllars/deleteItemFromCart");

const routes = express.Router();

routes.delete("/cart/:itemId", checkAuth, deleteItemFromCart);

module.exports = routes;