const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const cartItemQuantiyUpdate = require("../controllars/cartItemQuantiyUpdate");

const routes = express.Router();

routes.put("/cart/:itemId", checkAuth, cartItemQuantiyUpdate);

module.exports = routes;