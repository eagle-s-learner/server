const express = require("express");
const  logout  = require("../controllars/logout");

const routes = express.Router();

routes.post('/logout/', logout);

module.exports = routes;