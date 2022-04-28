const User = require("../models/user");
const Course = require("../models/course");
const Support = require("../models/support");
const SES = require("aws-sdk/clients/ses");
const enrollIssueResolved = require("../utils/email");

// aws config
const ses = new SES({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
});

export const currentAdmin = async (req, res) => {
  try {
    let user = await User.findById(req.user._id).select("-password").exec();
    if (!user.role.includes("Admin")) {
      res.sendStatus(403);
    } else {
      res.json({
        ok: true,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const listUsers = async (req, res) => {
  const users = await User.find({})
    .select("-password")
    .populate("courses", "_id slug name")
    .exec();
  res.json(users);
};

export const allIssues = async (req, res) => {
  const all = await Support.find()
    .populate("postedBy", "_id name email")
    .exec();
  res.json(all);
};

export const removeIssue = async (req, res) => {
  try {
    const resolved = await Support.findByIdAndRemove(req.params.issueId).exec();
    // console.log("__resolved__", resolved);
    return res.json(resolved);
  } catch (err) {
    console.log(err);
  }
};
