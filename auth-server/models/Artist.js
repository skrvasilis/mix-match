const mongoose = require("mongoose");
const { Schema } = mongoose;

const ArtistSchema = new Schema({
  artistName: {
    type: String,
    required: true,
  },
  artistAvatar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Artist", ArtistSchema); // Artist => equivalent: collection "artists" in MongoDB
