const express = require("express");
const  getItems  = require("../controllars/getItems");

const routes = express.Router();

routes.get('/items/', getItems);

module.exports = routes;