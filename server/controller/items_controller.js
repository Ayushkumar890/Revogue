const Item = require('../models/Items_model');

// Add Product
exports.addItems = async (req, res) => {
    try {
        let { productname, price, description, category } = req.body;

        // Trim to prevent whitespace-only input
        productname = productname?.trim();
        description = description?.trim();
        category = category?.trim();

        if (!productname || !price || !description || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (!isNaN(productname)) {
            return res.status(400).json({
                success: false,
                message: "Product name cannot be a number",
            });
        }

        // Generate unique 8-digit product number
        let productNumber;
        let isUnique = false;
        while (!isUnique) {
            productNumber = Math.floor(10000000 + Math.random() * 90000000);
            const exists = await Item.findOne({ productNumber });
            if (!exists) isUnique = true;
        }

        const newItem = await Item.create({
            productNumber,
            productname,
            price,
            description,
            category
        });

        return res.status(201).json({
            success: true,
            message: "Item added successfully",
            item: newItem,
        });

    } catch (error) {
        console.error("Add item error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to add the item",
        });
    }
};


// Delete Product by productNumber
exports.deleteItem = async (req, res) => {
    try {
        const { productNumber } = req.params;

        const deletedItem = await Item.findOneAndDelete({ productNumber });

        if (!deletedItem) {
            return res.status(404).json({
                success: false,
                message: "Item not found with this product number",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Item deleted successfully",
            item: deletedItem,
        });

    } catch (error) {
        console.error("Delete item error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to delete the item",
        });
    }
};


// Get Products by name (search with regex)
exports.getItems = async (req, res) => {
    try {
        const { productname } = req.body;

        if (!productname) {
            return res.status(400).json({
                success: false,
                message: "Product name is required",
            });
        }

        const items = await Item.find({
            productname: { $regex: productname, $options: "i" },
        });

        if (items.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found matching that name",
            });
        }

        return res.status(200).json({
            success: true,
            items,
        });

    } catch (error) {
        console.error("Get item error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch items",
        });
    }
};


// Get All Items
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find();

        if (!items.length) {
            return res.status(404).json({
                success: false,
                message: "No items found",
            });
        }

        return res.status(200).json({
            success: true,
            items,
        });

    } catch (error) {
        console.error("Get all items error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch items",
        });
    }
};
