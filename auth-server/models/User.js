const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: false,
    },
    spotifyUserID: {
      type: String,
      required: true,
      unique:true
    },
    userImages: [
      {
        url: {
          type: String,
          required: false,
        },
      },
    ],
    userLink: {
      type: String,
      required: true,
      unique: true,
    },
    userArtists: [
      {
        // REFERENCING a document!
        type: mongoose.ObjectId,
        ref: "Artist", // => this tells mongoose WHERE to look for the document with the given ID
      },
    ],
    userGenres: [
      {
        // REFERENCING a document!
        type: mongoose.ObjectId,
        ref: "Genre", // => this tells mongoose WHERE to look for the document with the given ID
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
