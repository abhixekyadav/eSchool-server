import User from "../models/user";
import Course from "../models/course";
import Qa from "../models/qa";
import queryString from "query-string";

export const makeInstructor = async (req, res) => {
  try {
    // 1. find user from db
    const user = await User.findById(req.user._id).exec();
    // 2. add roles
    console.log("USER", user.role);

    if (!user.role.includes("Instructor")) {
      user.role.push("Instructor");
      user.save();
    }

    res.json({
      ok: true,
    });
  } catch (err) {
    console.log("MAKE INSTRUCTOR ERR ", err);
  }
};

export const currentInstructor = async (req, res) => {
  try {
    let user = await User.findById(req.user._id).select("-password").exec();
    if (!user.role.includes("Instructor")) {
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

export const instructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id })
      .sort({ createdAt: -1 })
      .exec();
    // console.log("instructor courses", courses);
    res.json(courses);
  } catch (err) {
    console.log(err);
  }
};

export const studentCount = async (req, res) => {
  try {
    // console.log("req.body.courseId", req.body.courseId);
    const users = await User.find({ courses: req.body.courseId })
      .select("_id")
      .exec();
    // console.log("user count", users);
    res.json(users);
  } catch (err) {
    console.log(err);
  }
};

export const questionCount = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id })
      .select("_id")
      .exec();

    const total = await Qa.find({ courseId: courses })
      .select("courseId")
      .exec();

    // console.log("***TOTAL***", total);
    res.json(total.length);
  } catch (err) {
    console.log(err);
  }
};
