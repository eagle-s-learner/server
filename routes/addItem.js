const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const addItem = require("../controllars/addItem");

const routes = express.Router();

routes.post("/additem", checkAuth, addItem);

module.exports = routes;