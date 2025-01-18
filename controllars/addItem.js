const client = require("../config");


 async function addItem(req, res)  {
    const userId = req.user.id;  
    const { id } = req.body; 
    console.log(req.body) 

    try {
        // Check if the item is already in the user's cart
        const existingItem = await client.query(
            `SELECT * FROM cartitems WHERE user_id = $1 AND item_id = $2`,
            [userId, id]
        );

        if (existingItem.rows.length > 0) {
            // If item exists, increment the quantity by 1
            await client.query(
                `UPDATE cartitems SET quantity = quantity + 1 WHERE user_id = $1 AND item_id = $2`,
                [userId, id]
            );
        } else {
            // If item does not exist, insert it with quantity 1
            await client.query(
                `INSERT INTO cartitems (user_id, item_id, quantity) VALUES ($1, $2, $3)`,
                [userId, id, 1]
            );
        }

        res.status(200).json({ message: "Item added to cart successfully!" });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = addItem;