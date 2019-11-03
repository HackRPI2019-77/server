const mongoose = require('mongoose');
const CountySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rainfall: {
        type: Number,
        required: true
    },
    winds: {
        type: Number,
        required: true
    },
    recovered: {
        type: Boolean,
        required: true
    },
    hurricaneSeason: {
        type: Boolean,
        required: true
    }
});

module.exports = County = mongoose.model('county', CountySchema);