const client = require("../config");

async function cartItemQuantiyUpdate(req, res) {
    const userId = req.user.id;
    const itemId = req.params.itemId;
    const { quantity } = req.body;

    if (quantity < 0) {
        return res
            .status(400)
            .json({ message: "Quantity cannot be negative." });
    }

    try {
        if (quantity === 0) {
            // If quantity is 0, remove the item
            const result = await client.query(
                `DELETE FROM cartitems WHERE user_id = $1 AND item_id = $2`,
                [userId, itemId]
            );

            if (result.rowCount === 0) {
                return res
                    .status(404)
                    .json({ message: "Item not found in cart." });
            }

            return res.status(200).json({ message: "Item removed from cart." });
        } else {
            // Update the item quantity
            const result = await client.query(
                `UPDATE cartitems SET quantity = $1 WHERE user_id = $2 AND item_id = $3`,
                [quantity, userId, itemId]
            );

            if (result.rowCount === 0) {
                return res
                    .status(404)
                    .json({ message: "Item not found in cart." });
            }

            res.status(200).json({ message: "Item quantity updated." });
        }
    } catch (error) {
        console.error("Error updating item quantity:", error);
        res.status(500).json({ message: "Failed to update item quantity." });
    }
}

module.exports = cartItemQuantiyUpdate;
