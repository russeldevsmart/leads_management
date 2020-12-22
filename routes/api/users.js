const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const formidable = require("formidable");
const keys = require("../../config/keys");

// Load User model
const User = require("../../models/User");

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
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
                fullname: user.fullname,
              };
              jwt.sign(
                payload,
                keys.secretOrKey,
                {
                  expiresIn: 9000, // 15 mins in seconds
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
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.get("/get_me", (req, res) => {
  const authorization = req.headers.authorization.split(" ")[1];
  let decoded;
  try {
    decoded = jwt.verify(authorization, keys.secretOrKey);
  } catch (e) {
    return res.status(401).send("unauthorized");
  }
  const userId = decoded.id;
  User.findOne({ _id: userId }).then(function (user) {
    return res.json({
      id: user._id,
      pic: user.pic,
      email: user.email,
      fullname: user.fullname,
      username: user.username,
      companyName: user.companyName,
      phone: user.phone,
      website: user.website,
      language: user.language,
      timeZone: user.timeZone,
      password: undefined,
    });
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              id: user._id,
              email: user.email,
              fullname: user.fullname,
              username: user.username,
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

router.post("/update", (req, res) => {
  let obj = null,
    avatar = null;
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    obj = fields;
  });

  form.on("fileBegin", function (name, file) {
    let currentTime = new Date().getTime();
    file.path =
      __dirname +
      "/../../uploads/" +
      currentTime +
      "." +
      file.name.split(".")[1];
    avatar = "/uploads/" + currentTime + "." + file.name.split(".")[1];
  });

  form.on("file", function (name, file) {});

  form.on("end", function () {
    const setQuery = { $set: { ...obj, pic: avatar ? avatar : obj.pic } };
    delete setQuery.id;
    const userId = obj.id;
    User.findByIdAndUpdate(
      { _id: userId },
      setQuery,
      async function (err, doc) {
        if (err) {
          console.log(err);
          return res.status(400).json({ message: "Something went wrong!" });
        }
        let user = await User.findOne({ _id: userId });
        return res.json(user);
      }
    );
  });
});

router.post("/change-password", async (req, res) => {
  const { curPassword, newPassword, userId } = req.body;
  const user = await User.findById(userId);
  // Check password
  bcrypt.compare(curPassword, user.password).then((isMatch) => {
    if (isMatch) {
      user.password = newPassword;
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          user
            .save()
            .then((user) => {
              return res.status(200).json(user);
            })
            .catch((err) => console.log(err));
        });
      });
    } else {
      return res.status(400).json({ message: "Current Password incorrect" });
    }
  });
});

module.exports = router;
