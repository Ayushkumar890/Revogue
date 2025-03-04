const Item = require('../models/Items_model');

// Product add handler

exports.addItems = async (req, res) => {
    try {
        const { productname, price, description, category } = req.body;

        if (!isNaN(productname)) {
            return res.status(400).json({
                success: false,
                message: "Name cannot be a number",
            });
        }

        if (!productname || !price || !description || !category) {
            return res.status(400).send({
                success: false,
                message: "Allfield are required",
            })
        }

        let productNumber = Math.floor(10000000 + Math.random() * 90000000);
        let result = await Item.findOne({ productNumber });
        while (result) {
            productNumber = Math.floor(10000000 + Math.random() * 90000000);
            result = await Item.findOne({ productNumber });
        }
        console.log(productNumber);

        const newItem = await Item.create({
            productNumber,
            productname, price, description, category
        });
        return res.status(200).json({
            success: true,
            Item: newItem,
            message: "Item add successfully"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "faild to add the item"
        });
    }
}

// Product delete handler


exports.deleteItem = async (req, res) => {
    try {
        const { productNumber } = req.params;

        const deletedItem = await Item.findOneAndDelete({ productNumber: productNumber });

        if (!deletedItem) {
            return res.status(404).json({
                success: false,
                message: "Item with this product number not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Item deleted successfully",
            deletedItem: deletedItem,
        });

    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete the item",
        });
    }
};


// Product get handler

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
            productname: { $regex: productname, $options: 'i' }
        });

        if (items.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Product found with that name",
            });
        }

        return res.status(200).json({
            success: true,
            items: items,
        });

    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch Products",
        });
    }
};


// Get all items handler
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find();

        if (items.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Product found",
            });
        }

        return res.status(200).json({
            success: true,
            items: items,
        });

    } catch (error) {
        console.error("Error fetching all Product:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch Product",
        });
    }
};
