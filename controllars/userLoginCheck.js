const client = require("../config");
const dotenv = require("dotenv");
const jsonwebtoken = require("jsonwebtoken");

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

async function userlogincheck(req, res) {
    const token = req.cookies?.token;

    if (!token) {
        return res
            .status(401)
            .json({ message: "No token provided, please log in." });
    }
    try {
        if (token) {
            jsonwebtoken.verify(token, jwtSecret, {}, async (err, user) => {
                if (err) {
                    throw err;
                }

                const response = await client.query(
                    `SELECT * FROM users WHERE email = ($1)`,
                    [user.email]
                );
                // console.log(posts);

                res.status(200).json(response.rows[0]);
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to fetch posts" });
    }
}

module.exports = userlogincheck;
