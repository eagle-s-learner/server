const express = require("express");
const jsonWebToken = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const client = require("../config");


const router = express.Router();
router.use(cookieParser());

const jwtSecret = process.env.JWT_SECRET;

async function checkAuth(req, res, next){
    const { token } = req.cookies;
    // console.log(req.body)
    // console.log(token)
    try {
        if (token) {
            const decoded = await jsonWebToken.verify(token, jwtSecret);

            const response = await client.query(
                `SELECT * FROM users WHERE email = $1`,
                [decoded.email]
            );
                // console.log(response);

                req.user = response.rows[0];
            // });
        }
        next();
    } catch (error) {
        // console.log(error)
        res.status(error.status).json({ message: error.message });
    }
};

module.exports = checkAuth;
