const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const ArtistSchema = new Schema({
  name: {
      type: String,
      required: false,
      unique:true
  }
});

module.exports = mongoose.model('Artist', ArtistSchema) // Artist => equivalent: collection "artists" in MongoDB
