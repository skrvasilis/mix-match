const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const GenreSchema = new Schema({
    gernre: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('Genre', GenreSchema);