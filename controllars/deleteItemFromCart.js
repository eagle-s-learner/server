const client = require("../config");

async function deleteItemFromCart (req, res) {
    const itemId = req.params.itemId;
    const userId = req.user.id;

    try {
        const result = await client.query(
            `DELETE FROM cartitems WHERE user_id = $1 AND item_id = $2`,
            [userId, itemId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Item not found in cart." });
        }

        res.status(200).json({ message: "Item removed from cart successfully." });
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ message: "Failed to remove item from cart." });
    }
};


module.exports = deleteItemFromCart;