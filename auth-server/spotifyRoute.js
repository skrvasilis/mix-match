const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("./models/User");
const MusicGenre = require("./models/Genre");
const Artists = require("./models/Artist");
const fetch = require("node-fetch");
router
  .route("/spotify/callback")
  .get(passport.authenticate("spotify"), async function (req, res, next) {
    try {
      let usersId = "";
      const userData = req.user._json;

      ////////////////////////////////////////////////////////
      // here we make a call to spotify using the node-fetch library in order to get the top 20 artists from the current user user
      accessToken = req.authInfo;
      const usersTop = await (
        await fetch(
          "https://api.spotify.com/v1/me/top/artists?time_range=medium_term",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
          }
        )
      ).json();

      // we get the genres we delete duplicates and then we save it to the database
      let userGenres = [];
      usersTop.items.map((item) => {
        userGenres.push(...item.genres);
      });

      /* console.log(userGenres)
      userGenres = [...new Set(userGenres)]; */

      var counts = {};
userGenres.forEach(function (x) {
  counts[x] = (counts[x] || 0) + 1;
});

var sortable = [];
for (var number in counts) {
  sortable.push([number, counts[number]]);
}

const sorted = sortable.sort(function (a, b) {
  return b[1] - a[1];
});

const sortedGenres = sorted.map((item) => {
  return item[0];
});

      // checking for duplicates
      const genres = sortedGenres.map(async (item) => {
        return await MusicGenre.findOneAndUpdate(
          { genre: item },
          { genre: item },
          { new: true, upsert: true }
        );
      });
      await Promise.all(genres);

      let myArtists = [];
      usersTop.items.map((item) => {
        myArtists.push({
          artistName: item.name,
          artistAvatar: item.images[0] && item.images[0].url,
        });
      });

     
      const userArtists = usersTop.items.map(async (item) => {
        return await Artists.findOneAndUpdate(
          { artistName: item.name },
          {
            artistName: item.name,
            artistAvatar: item.images[0] && item.images[0].url,
          },
          { new: true, upsert: true }
        );
      });
     
      /// get thr artists ids
      console.log((await genres[0])._id);
      const userArtistsIds = [];
      for (let i = 0; i < userArtists.length; i++) {
        userArtistsIds.push((await userArtists[i])._id);
      }

      // get the genres ids
      const genresIds = [];
      for (let i = 0; i < genres.length; i++) {
        genresIds.push((await genres[i])._id);
      }
      // this checks if the user is already exists. If not it creates a new one
      const userExist = await User.findOneAndUpdate(
        { userName: userData.display_name },
        {
          userName: userData.display_name,
          $push: { artistsFollowed: userArtistsIds },
          $push: { musicGenres: genresIds },
        },

        { new: true }
      );
      if (userExist) {
        try {
          const authToken = userExist.generateAuthToken();
          const data = userExist;
          res
            .status(200)
            .cookie("token", authToken, {
              expires: new Date(Date.now() + 604800000),
              secure: false, // if we are not using https
              httpOnly: true,
            })
            // .send(data)
            .redirect("http://localhost:3000/welcome");
        } catch (error) {
          next(error);
        }
      } else {
        const newUser = new User({
          userName: userData.display_name,
          avatar: userData.images[0] && userData.images[0].url,
          userLink: userData.external_urls.spotify,
          userArtists: userArtistsIds,
          userGenres: genresIds,
        });
        const user = await newUser.save();

        // create the cookie and send the user to the front end
        try {
          const authToken = user.generateAuthToken();
          const data = user;
          res
            .status(200)
            .cookie("token", authToken, {
              expires: new Date(Date.now() + 604800000),
              secure: false, // if we are not using https
              httpOnly: true,
            })
            // .send(data)
            .redirect("http://localhost:3000/welcome");
        } catch (error) {
          next(error);
        }
      }
    } catch (error) {
      next(error);
    }
  });

router.route("/spotify").get(
  passport.authenticate("spotify", {
    scope: ["user-read-email", "user-read-private", "user-top-read"],
    showDialog: true,
  })
);

module.exports = router;
