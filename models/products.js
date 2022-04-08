const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    rating: {
        rate: {
            type: Number,
            min: 0,
            max: 5
        },
        count: {
            type: Number,
            min: 0
        }
    }
});

module.exports = mongoose.model('Product', productSchema);
