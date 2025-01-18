const bcrypt = require("bcrypt");
const client = require("../config")

const saltRound = 10;
const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRound);
    return bcrypt.hashSync(password, salt);
};

async function signup(req, res) {
    let {name , email, password} = req.body;
    try{
        const response = await client.query(`SELECT * FROM users WHERE email = ($1)`, [email]);
        if(response.rows.length > 0){
            res.status(400).json({message: "user with this email aready exists"});
            return;
        }

        password = hashPassword(password);
        await client.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, password]);
        res.status(200).json({message: "Account created."})
    }catch(error){
        console.log(error)
        res.status(500).json({message: "Internal Server error"});
    }
}

module.exports = signup;