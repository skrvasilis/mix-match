/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

const express = require("express"); // Express web server framework
const cors = require("cors"); //Middleware CORS
const app = express(); // Create express
const mongoose = require("mongoose"); //Mongoose
const request = require("request"); // "Request" library
const querystring = require("querystring");
const cookieParser = require("cookie-parser");
const User = require("./models/User");
const Artist = require("./models/Artist");
const Genre = require("./models/Genre");

//We bring here the mongodb connection string:
const { MONGODB_URI, client_id, client_secret } = require("./config.js");
const PORT = process.env.port || 5000;

/** CONNECT TO DB */

//We have to add our database above the server, so it connects before we run the server.
//We put the sensitive connection data in config.js file
//We have to add the useNewUrlPharser and useUnifiedTopology otherwise it gives a deprication warning

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }) //this returns a promise, so we need to say :
  .then(() => {
    console.log("MongoDB Connected!");
    //Then if connected, we listen to the port (previously defined) 5000 port.
    return app.listen({
      port: PORT,
    });
  })
  .then((res) => console.log(`Server Started at http://localhost:${PORT}`))
  .catch((err) => {
    console.error(err);
  });

const redirect_uri = "http://localhost:5000/callback"; // Or Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = "spotify_auth_state";

// var app = express();

app.use(express.json({ extended: false }));
app.use(express.static(__dirname + "/public")).use(cookieParser());

app.get("/login", function (req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope =
    "user-read-private user-read-email user-read-playback-state user-read-recently-played user-top-read";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

app.get("/callback", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var options = {
          url: "https://api.spotify.com/v1/me",
          headers: {
            Authorization: "Bearer " + access_token,
          },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(options, function (error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          "http://localhost:3000/welcome/#" +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
            })
        );
      } else {
        res.redirect(
          "/welcome/#" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
});

app.get("/refresh_token", function (req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
});

//SEEDING SHIT// NEEDS TO BE DELETED BEFORE GOING LIVE

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
  "Hercules & Love Affair",
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
  "nu disco",
];

app.use(cors());

app.get("/seed", async (req, res, next) => {
  // We purge all the users
  await User.deleteMany({});
  console.log(`All users have been deleted...`);

  await Artist.deleteMany({});
  console.log(`All artist have been deleted...`);

  await Genre.deleteMany({});
  console.log(`All genres have been deleted...`);

  let genresCreate = await genresArray.map((item) => {
    let result = {
      genre: item,
    };
    return result;
  });

  let genres = await Genre.insertMany(genresCreate);
  genres.map((item) => {
    console.log(`NEW genre created:${item.genre}`);
  });

  let artistsCreate = await artistsArray.map((item) => {
    let result = {
      name: item,
    };
    return result;
  });

  let artists = await Artist.insertMany(artistsCreate);

  artists.map((item) => {
    console.log(`NEW artists created:${item.name}`);
  });

  // We create 4 fake users

  let users = await User.insertMany([
    {
      userName: "blessedog",
      spotifyUserID: "blessedog",
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
      ],
    },
    {
      userName: "Konstantinos Phassas",
      spotifyUserID: "Konstantinos Phassas",
      userImages: [
        {
          url:
            "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=116204472104412&height=300&width=300&ext=1602968529&hash=AeQHLArqAfPau56Y",
        },
      ],
      userLink: "https://open.spotify.com/user/21h2bu2drbkwpzbouw7ncvxlq",
      userArtists: [
        artists[1]._id,
        artists[2]._id,
        artists[3]._id,
        artists[4]._id,
        artists[6]._id,
        artists[8]._id,
        artists[10]._id,
        artists[12]._id,
        artists[14]._id,
        artists[16]._id,
        artists[18]._id,
      ],
      userGenres: [
        genres[0]._id,
        genres[2]._id,
        genres[4]._id,
        genres[6]._id,
        genres[8]._id,
        genres[10]._id,
        genres[12]._id,
        genres[14]._id,
        genres[16]._id,
        genres[18]._id,
        genres[19]._id,
      ],
    },
    {
      userName: "Demetrious Betas",
      spotifyUserID: "Demetrious Betas",
      userImages: [
        {
          url:
            "https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-1/p320x320/67396250_10217585903271371_8450456826142523392_n.jpg?_nc_cat=109&_nc_sid=0c64ff&_nc_ohc=66MY3SgqIgsAX_qaMB4&_nc_oc=AQnAjglLfPkOfI9s5nsArZMXtVAMR99DPAjs6kVRzp49SjewdYcaJURh4gbN_riIJeY&_nc_ht=scontent-amt2-1.xx&tp=6&oh=bf1cd7980ebef505b4d7c2bc7d212c42&oe=5F8995EC",
        },
      ],
      userLink: "https://open.spotify.com/user/11137922672",
      userArtists: [
        artists[1]._id,
        artists[3]._id,
        artists[5]._id,
        artists[7]._id,
        artists[9]._id,
        artists[11]._id,
        artists[13]._id,
        artists[15]._id,
        artists[17]._id,
        artists[19]._id,
        artists[0]._id,
      ],
      userGenres: [
        genres[1]._id,
        genres[3]._id,
        genres[5]._id,
        genres[7]._id,
        genres[9]._id,
        genres[11]._id,
        genres[13]._id,
        genres[15]._id,
        genres[17]._id,
        genres[19]._id,
        genres[21]._id,
      ],
    },
  ]);
  res.send(users);
  console.log(`NEW users created...`);
});

app.get("/users", async (req, res, next) => {
  let users = await User.find();
  // .populate('userArtists')
  // .populate('userGenres')
  res.send(users);
});

app.get("/users/:id", async (req, res, next) => {
  let { id } = req.params;

  // findOne we use if we want to search by some criteria other than ID
  // await Post.findOne({ email: 'rob@dci.org' })

  // findById we use if we want to grab a record by ID
  let user = await User.findById(id);
  // .populate('userArtists')
  // .populate('userGenres')
  // what does populate do?
  // it looks up the documents BEHIND the IDs and replace the ID by the actual document content
  // so that way we can provide all data the frontend needs in ONE requests

  res.send(user);
});

// app.post("/artists", async (req, res, next) => {
//   try {
//     console.log(req.body);
//     const artists = await Artist.insertMany(req.body);
//     let myArtists = await Artist.find({ "name": {$in : [req.body]}  });
//     console.log("myartists", myArtists);

//     res.send(artists);
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.post("/genres", async (req, res, next) => {
//   try {
//     console.log(req.body);
//     const genres = await Genre.insertMany(req.body);
//     let myGenres = await Genre.find({ genre: req.body });
//     console.log(myGenres);

//     res.send(genres);
//   } catch (err) {
//     console.log(err);
//   }
// });

app.post("/users", async (req, res) => {
  try {
    // const genres = await Genre.insertMany(req.body.userGenres);
    // const artists = await Artist.insertMany(req.body.userArtists);

    const myArtists = req.body.userArtists.map((item) => item.name);
    const myGenres = req.body.userGenres.map((item) => item.genre);

    let theArtistsIDs = await Artist.find({ name: { $in: myArtists } });
    let theGenresIDs = await Genre.find({ genre: { $in: myGenres } });

    
    theArtistsIDs = theArtistsIDs.map((item)=>{
      return item._id
    })

    theGenresID = theGenresIDs.map((item)=>{
      return item._id
    })

    console.log(req.body)

    const user = new User({
      userName: req.body.userName,
      spotifyUserID: req.body.spotifyUserID,
      userImages: req.body.userImages,
      userLink: req.body.userLink,
      userArtists: theArtistsIDs,
      userGenres: theGenresIDs,
    });
     const data = await user.save();
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

//lsof -ti :5000 | xargs kill
