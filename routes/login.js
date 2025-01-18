const express = require("express");
const  login  = require("../controllars/login");

const routes = express.Router();

routes.post('/login/', login);

module.exports = routes;