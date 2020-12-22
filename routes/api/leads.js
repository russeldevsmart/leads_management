const { query } = require("express");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const moment = require("moment");
const keys = require("../../config/keys");

// Load User model
const Lead = require("../../models/Lead");
const CarMake = require("../../models/CarMake");
const CarModel = require("../../models/CarModel");
const Action = require("../../models/Action");

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

router.get("/get-dashboard-info", async (req, res) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const totalLeads = await Lead.count({});
  const newLeads = await Lead.count({ status: "Nouveau" });
  const ongoingLeads = await Lead.count({
    status: { $nin: ["Nouveau", "Perdu"] },
  });
  const goneLeads = await Lead.count({ status: "Perdu" });
  const lastActions = await Action.find({})
    .sort({ date: -1 })
    .populate("lead")
    .populate("user");
  const topLeadAction = await Action.find({})
    .sort({ date: -1 })
    .limit(1)
    .populate("lead")
    .populate("user");

  const topLead =
    topLeadAction && topLeadAction.length >= 1
      ? { name: topLeadAction[0].user.fullname, pic: topLeadAction[0].user.pic }
      : null;

  // last 7 days chart data
  const date = new Date();
  const last_7_days = new Date(date.getTime() - 6 * 24 * 60 * 60 * 1000);
  let weeklyChartData = [];
  let weeklyChartData1 = [];
  let weeklyChartDataLabel = [];
  for (const d = last_7_days; d <= new Date(); d.setDate(d.getDate() + 1)) {
    const td_start = new Date(d);
    td_start.setHours(0, 0, 0, 0);
    const td_end = new Date(d);
    td_end.setHours(23, 59, 59, 999);
    const cnt = await Lead.count({
      created_on: { $gte: td_start, $lt: td_end },
    });

    const nd_start = new Date(d.getTime() - 6 * 24 * 60 * 60 * 1000);
    nd_start.getHours(0, 0, 0, 0);
    const nd_end = new Date(d.getTime() - 6 * 24 * 60 * 60 * 1000);
    nd_end.getHours(23, 59, 59, 999);
    const cnt1 = await Lead.count({
      created_on: { $gte: nd_start, $lt: nd_end },
    });
    weeklyChartData.push(cnt);
    weeklyChartData1.push(cnt1);
    weeklyChartDataLabel.push(moment(d).format("ddd"));
  }

  // status pie chart data
  const leadStatuChartData = await Lead.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]).exec();

  // yearly heatmap chart data
  let yearlyHeatmapData = {};
  for (let d = 1; d <= 12; d++) {
    const now = new Date();
    now.setMonth(d);
    const mon = moment(now).format("MMM");
    yearlyHeatmapData[mon] = [];
    for (let dd = 1; dd <= daysInMonth(d, 2020); dd++) {
      const d_start = new Date();
      d_start.setMonth(d);
      d_start.setDate(dd);
      d_start.setHours(0, 0, 0, 0);
      const d_end = new Date();
      d_end.setMonth(d);
      d_end.setDate(dd);
      d_end.setHours(23, 23, 59, 999);
      const cnt = await Lead.count({
        created_on: { $gte: d_start, $lt: d_end },
      });
      yearlyHeatmapData[mon].push({ x: dd, y: cnt });
    }
  }

  return res.json({
    totalLeads,
    newLeads,
    ongoingLeads,
    lastActions,
    topLead,
    weeklyLeadsChartData: {
      label: weeklyChartDataLabel,
      data: weeklyChartData,
      data1: weeklyChartData1,
    },
    leadStatuChartData,
    yearlyHeatmapData,
    goneLeads,
  });
});

router.get("/get-car-makes", async (req, res) => {
  try {
    const carMakes = await CarMake.find({});
    return res.json({
      carMakes,
    });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
});

router.post("/get-car-models", (req, res) => {
  const { makeIds } = req.body;
  CarModel.find({ id_car_make: { $in: makeIds } }, function (err, docs) {
    if (err) return res.status(400).json({ message: "Something went wrong!" });
    return res.json({ carModels: docs });
  });
});

router.get("/get", (req, res) => {
  Lead.findById(req.query.id)
    .populate("make")
    .populate("model")
    .populate("comments.created_by")
    .exec(async (err, doc) => {
      if (err) {
        res.status(400).json({ message: err });
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
  const authorization = req.headers.authorization.split(" ")[1];
  let decoded;
  try {
    decoded = jwt.verify(authorization, keys.secretOrKey);
  } catch (e) {
    return res.status(401).send("unauthorized");
  }
  const { comments } = req.body.lead;
  let commentList = [];
  commentList.push({
    content: "",
    created_by: decoded.id,
    created_on: new Date(),
    type: "action_created",
  });
  if (comments !== "") {
    commentList.push({
      content: comments,
      created_by: decoded.id,
      created_on: new Date(),
      type: "comments",
    });
  }
  const newLead = new Lead({
    ...req.body.lead,
    created_by: decoded.id,
    created_on: new Date(),
    edited_by: decoded.id,
    edited_on: new Date(),
    comments: commentList,
  });
  newLead
    .save()
    .then(async (doc) => {
      let actionList = [];
      actionList.push({
        user: decoded.id,
        date: new Date(),
        lead: doc._id,
        action_type: "lead_created",
        content: "",
      });

      if (comments !== "")
        actionList.push({
          user: decoded.id,
          date: new Date(),
          lead: doc._id,
          action_type: "lead_comments",
          content: comments,
        });

      await Action.insertMany(actionList);

      Lead.findOne({ _id: doc._id })
        .populate("make")
        .populate("model")
        .populate("edited_by")
        .exec((err, lead) => {
          return res.json({ lead });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: err });
    });
});

router.post("/find", async (req, res) => {
  const { queryParams } = req.body;
  const totalCount = await Lead.count();
  Lead.find({})
    .skip(queryParams.pageSize * (queryParams.pageNumber - 1))
    .limit(queryParams.pageSize)
    .sort({ [queryParams.sortField]: -1, created_by: 1 })
    .populate("make")
    .populate("model")
    .populate("edited_by")
    .exec((err, docs) => {
      if (err) {
        return res.status(400).json({ message: "Something went wrong!" });
      }
      return res.json({
        totalCount,
        entities: docs,
      });
    });
});

router.post("/update", async (req, res) => {
  const authorization = req.headers.authorization.split(" ")[1];
  let decoded;
  try {
    decoded = jwt.verify(authorization, keys.secretOrKey);
  } catch (e) {
    return res.status(401).send("unauthorized");
  }

  const { lead } = req.body;
  const setQuery = {
    ...lead,
    edited_on: new Date(),
    edited_by: decoded.id,
  };
  delete setQuery.comments;
  let pushComments = [];

  let actionList = [];
  if (lead.comments !== "") {
    pushComments.push({
      created_on: new Date(),
      created_by: decoded.id,
      content: lead.comments,
      type: "comments",
    });
    actionList.push({
      user: decoded.id,
      date: new Date(),
      lead: lead._id,
      action_type: "lead_comments",
      content: lead.comments,
    });
  }
  if (lead.diffKeys.length > 0) {
    const action_content = lead.diffKeys
      .map((key) => key.charAt(0).toUpperCase() + key.slice(1))
      .join(", ");
    pushComments.push({
      created_on: new Date(),
      created_by: decoded.id,
      content: action_content.toString().replace("_", " "),
      type: "action_updated",
    });
    actionList.push({
      user: decoded.id,
      date: new Date(),
      lead: lead._id,
      action_type: "lead_updated",
      content: action_content.toString().replace("_", " "),
    });
  }
  Lead.findOneAndUpdate(
    { _id: lead._id },
    {
      $push: {
        comments: pushComments,
      },
      $set: setQuery,
    },
    { upsert: true },
    async function (err, doc) {
      if (err) console.log(err);
      await Action.insertMany(actionList);
      const updatedLead = await Lead.findOne({ _id: doc._id })
        .populate("make")
        .populate("model")
        .populate("edited_by");
      return res.json(updatedLead);
    }
  );
});

router.delete("/delete", (req, res) => {
  Lead.findByIdAndRemove(req.query.id, function (err, doc) {
    return res.json({ message: "Success" });
  });
});

router.post("/deleteLeads", (req, res) => {
  Lead.deleteMany({ _id: { $in: req.body.ids } }, function (err) {
    if (err) return res.status(400).json({ message: "Something went wrong!" });
    return res.json({ message: "Success" });
  });
});

module.exports = router;
