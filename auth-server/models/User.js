const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
const env = require("../config");
const jwt_key = env.JWT_SECRET


const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: false,
    },
    avatar: {
          type: String,
          required: false,
          default:null
        },
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



UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = "x-auth";

  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, jwt_key)
    .toString();

  return token;
};

UserSchema.methods.generateVerificationToken = function () {
  const user = this;
  const access = "x-verif";

  const token = jwt
    .sign(
      {
        _id: user._id.toHexString(),
        email: user.email,
        access,
      },
      env.ver_key
    )
    .toString();

  return token;
};

UserSchema.methods.checkPassword = async function (password) {
  const user = this;
  return await encryption.compare(password, user.password);
};

UserSchema.methods.getPublicFields = function () {
  return {
    _id: this._id,
    lastName: this.lastName,
    firstName: this.firstName,
    email: this.email,
    fullName: this.fullName,
    birthday: new Date(this.birthday),
    address: this.address,
    avatar: this.avatar,
    userName: this.userName,
    role: this.role,
    verified: this.verified,
    myVenues: this.myVenues,
    venuesFollowed: this.venuesFollowed,
    venuesLiked: this.venuesLiked,
    myEvents: this.myEvents,
    artistsFollowed: this.artistsFollowed,
    artistsLiked: this.artistsLiked,
    spotifyId: this.spotifyId,
    socialMedia: this.socialMedia
  };
};

UserSchema.statics.findByToken = function (token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, jwt_key);
  } catch (err) {
    return;
  }

  return User.findOne({
    _id: decoded._id,
  });
};

UserSchema.statics.findByVerifToken = function (token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, env.ver_key);
  } catch (err) {
    return;
  }

  return User.findByIdAndUpdate(
    {
      _id: decoded._id,
    },
    { verified: true },
    { new: true }
  );
};


module.exports = mongoose.model("User", UserSchema);
