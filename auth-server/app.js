/** EXTERNAL DEPENDENCIES */
require('dotenv').config()
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const spotify = require("./spotifyRoute");
const port = 5000;



/** ROUTERS */
/* const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const spotify = require("./routes/spotify");
const musicGenresRouter = require("./routes/musicGenres");
const artistsRouter = require("./routes/artists"); */
/** OUR MIDDLEWARE */
const env = require("./config");
const usersRouter = require("./routes/users");
const cors = require("cors");




/** INIT THE SERVER */
const app = express();

/** LOGS */
app.use(logger("dev"));

/** CONNECT TO MONGO */
mongoose.connect(env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);

mongoose.connection.on("open", () => {
  console.log(`Connected to the database...`);
});

/** REQUEST PARSERS */
app.use(express.json()); // parser for JSON data => req.body
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

let frontendOrigin = "http://localhost:3000";
let vercelOrigin = "https://mixandmatch.vercel.app"
app.use(
  cors({
    origin: [frontendOrigin,vercelOrigin], // HERE YOU CAN WHITELIST THE DOMAIN OF YOUR CLIENT
    credentials: true, // allow cookies from other origins
  })
);

/** STATIC FILES */
app.use(express.static(path.join(__dirname, "public"))); // => current_folder / public
app.use("/avatars", express.static(path.join(__dirname, "uploads")));

/** ROUTES */

/*  app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/genres", musicGenresRouter);
app.use("/artists", artistsRouter); */


app.use("/auth", spotify);
app.use("/users", usersRouter);


 
// the spotify
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});


const authCallbackPath = "/auth/spotify/callback";

passport.use(
  new SpotifyStrategy(
    {
      clientID: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_SECRET,
      callbackURL: "https://mixandmatchserver.vercel.app" + authCallbackPath,
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        // To keep the example simple, the user's spotify profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the spotify account with a user record in your database,
        // and return that user instead.
        return done(null, profile, accessToken);
      });
    }
  )
);

/** ERROR HANDLING */
/* app.use(function (req, res, next) {
  const err = new Error("Looks like something is broken...");
  next(err);
}); */


app.listen(port, console.log(`server is running on port ${port}`));


app.use(function (err, req, res, next) {
  console.log(err)
  res.status(400).send({
    error: {
      message: err.message,
    },
  });
});

module.exports = app;
