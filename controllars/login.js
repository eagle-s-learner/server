const client = require("../config")
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jsonwebtoken = require("jsonwebtoken");

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

async function login(req, res){
    try {
        const { email, password } = req.body;
        const response = await client.query(`SELECT * FROM users WHERE email = ($1)`, [email]);
        
        if (response.rows.length > 0) {
            const checkPassword = bcrypt.compareSync(
                password,
                response.rows[0].password
            );
            
            if (checkPassword) {
                jsonwebtoken.sign(
                    {
                        email: response.rows[0].email,
                        password: response.rows[0].password,
                    },
                    jwtSecret,
                    {},
                    (error, token) => {
                        if (error) {
                            throw error;
                        }
                        
                        // console.log(response.rows[0].email, password);
                        res.cookie("token", token).status(200).json({message: "login successful"});
                    }
                );
            }else{
                res.status(422).json({message: "Password or Email is incorrect"})
            }
        }else{
            res.status(400).json({message: "User Not Found"});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}

module.exports = login;