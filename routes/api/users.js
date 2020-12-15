const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const { secretOrKey } = require("../../config/keys");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = {
                id: user._id,
                fullname: user.fullname
              };
              jwt.sign(
                payload,
                keys.secretOrKey,
                {
                  expiresIn: 9000 // 15 mins in seconds
                },
                (err, token) => {
                  res.json({
                    id: user._id,
                    email: user.email,
                    fullname: user.fullname,
                    username: user.username,
                    password: undefined,
                    accessToken: token,
                  });
                }
              )
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.get("/get_me", (req, res) => {
  const authorization = req.headers.authorization.split(' ')[1];
  let decoded;
  try {
    decoded = jwt.verify(authorization, keys.secretOrKey);
  } catch (e) {
    return res.status(401).send('unauthorized');
  }
  const userId = decoded.id;
  User.findOne({_id: userId}).then(function (user) {
    return res.json({
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      username: user.username,
      password: undefined
    });
  })
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              id: user._id,
              email: user.email,
              fullname: user.fullname,
              username: user.username,
              password: undefined,
              accessToken: token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
