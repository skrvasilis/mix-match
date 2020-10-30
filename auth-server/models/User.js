const mongoose = require('mongoose');
const {
  Schema
} = mongoose;
const Track = require('./Track');
const Genre = require('./Genre');

const UserSchema = new Schema({
  userName: {
    type: String,
    required: false,
  },
  userID: {
    type: String,
    required: true,
  },
  userImages: [{
      image: {
        type: String,
        required: false,
      }
    }],
  userLink: {
    type: String,
    required: true,
    unique: true,
  },
  userTracks: Track,
  userGenres: Genre,
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);