const client = require("../config");

async function getUserCartItem(req, res) {
    const userId = req.user.id;

    try {
        const result = await client.query(
            `SELECT ci.item_id, i.item_name, i.description, i.image, i.price, ci.quantity
             FROM cartitems ci
             JOIN items i ON ci.item_id = i.id
             WHERE ci.user_id = $1`,
            [userId]
        );

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ message: "Error fetching cart items." });
    }
};

module.exports = getUserCartItem;