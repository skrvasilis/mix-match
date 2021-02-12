const express = require("express");
const router = express.Router();

const { getUsers , me, findMatches,logoutUser} = require("../controllers/UserController");

// router.route("/").get(getUsers);
router.route("/me").get(me);
router.route("/logout").post(logoutUser)
router.route("/matches/:id").get(findMatches)

module.exports = router;

