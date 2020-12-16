const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/verify-phone-number", async (req, res) => {
  const number = req.query.number;
  const API = `https://apilayer.net/api/validate?access_key=152e6b0b8550cdddaf5f2ac1435e8cc9&number=${number}`;
  axios.get(API)
    .then(response => {
      res.json(response.data);
    }).catch(err => {
      res.status(400).json({message: "API Error"});
    })
});

module.exports = router;
