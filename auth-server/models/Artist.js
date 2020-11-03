const mongoose = require("mongoose");
const { Schema } = mongoose;

const ArtistSchema = new Schema({
  name: {
    type: String,
    index: {unique: true},
    required: false,
  },
});

module.exports = mongoose.model("Artist", ArtistSchema); // Artist => equivalent: collection "artists" in MongoDB
