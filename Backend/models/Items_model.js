const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({
    productNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    productname: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Item', itemsSchema);
