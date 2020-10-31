const mongoose = require('mongoose');
const User = require('../models/User');
const faker = require('faker');

//We bring here the mongodb connection string:
const {
  MONGODB_URI
} = require("../config");

console.log(`You are running the seed script.`);
console.log(`All your previous data will be purged.`);

// We connect to the database

/** CONNECT TO DB */

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on(
  'error',
  console.error.bind(console, 'connection error:')
);

db.once('open', () => {
  console.log(
    `You are connected to the DB. Seed will start now...`
  );
});

let artistsArray = [
  "Sakis Rouvas",
  "Alkistis Protopsalti",
  "Hot Chip",
  "Nalyssa Green",
  "Peaches",
  "John Grant",
  "Κόρε. Ύδρο.",
  "Dimitris Mitropanos",
  "Despina Vandi",
  "CSS",
  "The Growlers",
  "The Blaze",
  "Richard Cheese",
  "Katy Garbi",
  "Savina Yannatou",
  "Sevdaliza",
  "Stereo Total",
  "Placebo",
  "Giorgos Marinos",
  "Hercules & Love Affair"
];

let genresArray = [
  "alternative dance",
  "dance-punk",
  "electronica",
  "electropop",
  "indie pop",
  "indie rock",
  "indie soul",
  "indietronica",
  "modern rock",
  "alternative dance",
  "dance-punk",
  "electroclash",
  "ambient",
  "ambient idm",
  "chamber psych",
  "compositional ambient",
  "drone",
  "intelligent dance music",
  "escape room",
  "alternative dance",
  "indietronica",
  "french indie pop",
  "alternative rock",
  "britpop",
  "modern rock",
  "permanent wave",
  "alternative dance",
  "indietronica",
  "new rave",
  "nu disco"
]

app.get('/seed', async (req, res, next) => {
  // We purge all the users
    await User.deleteMany({});
    console.log(`All users have been deleted...`);

    await Artist.deleteMany({});
    console.log(`All tracks have been deleted...`);

    await Genre.deleteMany({});
    console.log(`All genres have been deleted...`);

    let genres = await genresArray.map((item) => {
      Genre.insertMany([{
        genre: item
      }])
    });

    let artists = await artistsArray.map((item) => {
      Artist.insertMany([{
        name: item
      }])
    });

  // We create 4 fake users



  const users = await User.insertMany([
    {
    userName: "blessedog",
    userID: "blessedog",
    userImages: [],
    userLink: "https://open.spotify.com/user/blessedog",
    userArtists: [
      artists[0]._id,
      artists[5]._id,
      artists[15]._id,
      artists[7]._id,
      artists[9]._id,
      artists[3]._id,
      artists[17]._id,
      artists[11]._id,
      artists[8]._id,
      artists[12]._id,
      artists[18]._id,
    ],
    userGenres: [
      genres[0]._id,
      genres[5]._id,
      genres[15]._id,
      genres[7]._id,
      genres[9]._id,
      genres[3]._id,
      genres[17]._id,
      genres[11]._id,
      genres[8]._id,
      genres[12]._id,
      genres[18]._id,
    ]
  }])
  
  res.send(posts)
})


  // We close the db connection
  console.log(
    `We are closing the mongoose connection. Ciaaaaoo!`
  );

  mongoose.connection.close();
