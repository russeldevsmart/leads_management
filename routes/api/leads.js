const { query } = require("express");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load User model
const Lead = require("../../models/Lead");
const CarMake = require("../../models/CarMake");
const CarModel = require("../../models/CarModel");

router.get("/get-car-makes", async (req, res) => {
  try {
    const carMakes = await CarMake.find({});
    return res.json({
      carMakes
    });
  } catch (error) {
    return res.status(400).json({message: "Something went wrong!"});
  }
});

router.post("/get-car-models", (req, res) => {
  const { makeIds } = req.body;
  CarModel.find({ id_car_make: { $in: makeIds } }, function(err, docs) {
    if (err)
      return res.status(400).json({message: "Something went wrong!"});
    return res.json({ carModels: docs });
  });
});

router.get("/get", (req, res) => {
  Lead.findById(req.query.id).populate("make").populate("model").exec(async (err, doc) => {
    if (err) {
      res.status(400).json({message: err})
    }
    let models = [];
    let lead = doc;
    if (doc.make && doc.make.length > 0) {
      const makeIds = doc.make.map((m) => m.id_car_make);
      models = await CarModel.find({ id_car_make: { $in: makeIds } });
      lead.make = doc.make.map((m) => m._id);
    } else lead.make = [];
    if (doc.model && doc.model.length > 0) {
      lead.model = doc.model.map((m) => m._id);
    } else lead.model = [];
    return res.json({ lead: doc, carModels: models });
  });
});


router.post("/create", (req, res) => {

  const authorization = req.headers.authorization.split(' ')[1];
  let decoded;
  try {
    decoded = jwt.verify(authorization, keys.secretOrKey);
  } catch (e) {
    return res.status(401).send('unauthorized');
  }
  const { comments } = req.body.lead;
  let commentList = [];
  if (comments !== "")
    commentList.push({
      content: comments,
      created_by: decoded.id,
      created_on: new Date(),
    });
  const newLead = new Lead({
    ...req.body.lead,
    created_by: decoded.id,
    created_on: new Date(),
    edited_by: decoded.id,
    edited_on: new Date(),
    comments: commentList
  });
  newLead.save()
    .then((doc) => {
      Lead.findOne({_id: doc._id}).populate("make").populate("model").populate("edited_by").exec((err, lead) => {
        return res.json({lead});
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({message: err});
    });
});


router.post("/find", async (req, res) => {
  const { queryParams }  = req.body;
  const totalCount = await Lead.count();
  Lead.find({})
    .skip(queryParams.pageSize * (queryParams.pageNumber - 1))
    .limit(queryParams.pageSize)
    .sort({ [queryParams.sortField]: -1 })
    .populate('make')
    .populate('model')
    .populate('edited_by')
    .exec((err, docs) => {
      if (err) {
        return res.status(400).json({ message: "Something went wrong!" });
      }
      return res.json({
        totalCount,
        entities: docs
      })
    });
});


router.post("/update", async (req, res) => {
  const authorization = req.headers.authorization.split(' ')[1];
  let decoded;
  try {
    decoded = jwt.verify(authorization, keys.secretOrKey);
  } catch (e) {
    return res.status(401).send('unauthorized');
  }

  const { lead } = req.body;
  const setQuery = {
    ...lead,
    'edited_on': new Date(),
    'edited_by': decoded.id,
  };
  delete setQuery.comments;
  if (lead.comments === "") {
    Lead.findOneAndUpdate({ _id: lead._id }, { $set: setQuery }, async function (err, doc) {
      if (err) console.log(err);
      const updatedLead = await Lead.findOne({_id: doc._id}).populate("make").populate("model").populate("edited_by");
      return res.json(updatedLead);
    });
  } else {
    Lead.findOneAndUpdate({ _id: lead._id }, {
      $push: {
        "comments": {
          created_on: new Date(),
          created_bY: decoded.id,
          content: lead.comments,
        }
      },
      $set: setQuery
    }, { upsert: true }, async function (err, doc) {
      if (err) console.log(err);
      const updatedLead = await Lead.findOne({_id: doc._id}).populate("make").populate("model").populate("edited_by");
      return res.json(updatedLead);
    });
  }
});


router.delete("/delete", (req, res) => {
  Lead.findByIdAndRemove(req.query.id, function (err, doc) {
    return res.json({message: "Success"});
  });
});

router.post("/deleteLeads", (req, res) => {
  Lead.deleteMany({_id: { $in: req.body.ids }}, function (err) {
    if (err)
      return res.status(400).json({message: "Something went wrong!"});
    return res.json({message: "Success"});
  })
});

module.exports = router;
