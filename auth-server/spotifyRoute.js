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
      // const usersTop = await (
      //   await fetch(
      //     "https://api.spotify.com/v1/me/top/artists?time_range=medium_term",
      //     {
      //       method: "GET",
      //       headers: {
      //         Accept: "application/json",
      //         "Content-Type": "application/json",
      //         Authorization: "Bearer " + accessToken,
      //       },
      //     }
      //   )
      // ).json();

      const response = await fetch(
        "https://api.spotify.com/v1/me/top/artists?time_range=medium_term",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      if (!response.ok) {
        const text = await response.text();
        console.error("Error response from Spotify:", text);
        throw new Error("Failed to fetch top artists");
      }

      const usersTop = await response.json();

      // we get the genres we delete duplicates and then we save it to the database
      let userGenres = [];
      usersTop.items.map((item) => {
        userGenres.push(...item.genres);
      });

      const counts = {};
      userGenres.forEach(function (x) {
        counts[x] = (counts[x] || 0) + 1;
      });

      let sortable = [];
      for (let number in counts) {
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
          artistsFollowed: userArtistsIds,
          musicGenres: genresIds,
        },

        { new: true }
      );
      if (userExist) {
        try {
          const authToken = userExist.generateAuthToken();
          const data = { userExist: userExist, authToken: authToken };
          res
            .status(200)
            .redirect(`${process.env.CLIENT_URL}/welcome?token=${authToken}`);
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
        try {
          const authToken = user.generateAuthToken();
          const data = { user: user, authToken: authToken };
          res
            .status(200)
            .redirect(`${process.env.CLIENT_URL}/welcome?token=${authToken}`);
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
