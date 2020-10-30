const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const TrackSchema = new Schema({
    track: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('Track', TrackSchema);