const client = require("../config");

async function getItems(req, res) {
    try {
        const result = await client.query(`SELECT * FROM items`);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = getItems;