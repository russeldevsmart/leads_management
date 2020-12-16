const { query } = require("express");
const express = require("express");
const router = express.Router();
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

router.get("/get-car-models", (req, res) => {
  CarModel.find({ id_car_make: req.query.make }, function(err, docs) {
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
    if (doc.make) {
      models = await CarModel.find({ id_car_make: doc.make.id_car_make });
      lead.make = lead.make._id;
    }
    if (doc.model) lead.model = lead.model._id;
    return res.json({ lead: doc, carModels: models });
  });
});


router.post("/create", (req, res) => {
  const newLead = new Lead({
    ...req.body.lead,
  });
  newLead.save()
    .then((doc) => {
      Lead.findOne({_id: doc._id}).populate("make").populate("model").exec((err, lead) => {
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
  const { lead } = req.body;
  Lead.findOneAndUpdate({ _id: lead._id }, {
    $set: {
      ...lead
    }
  }, function (err, doc) {
    return res.json(doc);
  });
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
