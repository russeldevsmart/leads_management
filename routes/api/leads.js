const { query } = require("express");
const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");

// Load User model
const Lead = require("../../models/Lead");

router.get("/get", (req, res) => {
  Lead.findById(req.query.id, function (err, doc) {
    if (err) {
      res.status(400).json({message: err})
    }
    return res.json({ lead: doc });
  });
});


router.post("/create", (req, res) => {
  const newLead = new Lead({
    ...req.body.lead
  });
  newLead.save()
    .then((lead) => res.json({lead}))
    .catch((err) => res.status(400).json({message: err}));
});


router.post("/find", async (req, res) => {
  const { queryParams }  = req.body;
  const totalCount = await Lead.count();
  Lead.find({})
    .skip(queryParams.pageSize * (queryParams.pageNumber - 1))
    .limit(queryParams.pageSize)
    .sort({ [queryParams.sortField]: -1 })
    .exec((err, docs) => {
      if (err)
        return res.status(400).json({ message: "Something went wrong!" });
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
