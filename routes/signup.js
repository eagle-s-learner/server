const express = require("express");
const  signup  = require("../controllars/signup");

const routes = express.Router();

routes.post('/signup/', signup);

module.exports = routes;