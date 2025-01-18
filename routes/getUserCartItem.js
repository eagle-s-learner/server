const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const getUserCartItem = require("../controllars/getUserCartItem");

const routes = express.Router();

routes.get("/cart", checkAuth, getUserCartItem);

module.exports = routes;