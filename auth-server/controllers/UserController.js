const User = require("../models/User");
const Genres = require("../models/Genre");
const Artists = require("../models/Artist");

exports.me = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    const user = await User.findByToken(token)
      .populate("userGenres")
      .populate("userArtists");

    if (!user) throw new createError.NotFound();

    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

exports.findMatches = async (req, res, next) => {
  try {

    const user = await User.findById(req.params.id);

    const similarArtists = await User.aggregate([
      {
        $project: {
          userName: 1,
          avatar: 1,
          userLink: 1,
          commonArtists: {
            $setIntersection: ["$userArtists", user.userArtists],
          },
          commonGenres: { $setIntersection: ["$userGenres", user.userGenres] },
          _id: 1,
        },
      },
    ]);

    const pop = await User.populate(similarArtists, {
      path: "commonArtists",
      model: Artists,
    });
    const afterPop = await User.populate(pop, {
      path: "commonGenres",
      model: Genres,
    });

    res.send(afterPop);
  } catch (e) {
    next(e);
  }
};

exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token").status(200).send("Bye bye");
};
