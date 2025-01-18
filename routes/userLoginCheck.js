const express = require("express");
const userLoginCheck = require("../controllars/userLoginCheck");

const routes = express.Router();

routes.get('/userlogincheck/', userLoginCheck);

module.exports = routes;