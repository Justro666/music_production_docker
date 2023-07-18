const helper = require("../../util/helper");
const { t3 } = require("../model/t3");

const test1 = async (req, res, next) => {
  try {
    let data = req.body;
    helper.fmsg(res, "test1", data);
  } catch (error) {
    next(new Error("Something Went Wrong"));
  }
};

const test2 = async (req, res, next) => {
  try {
    let data;
    helper.fmsg(res, "test2", data);
  } catch (error) {
    next(new Error("Something Went Wrong"));
  }
};
const test3 = async (req, res, next) => {
  try {
    let data;
    helper.fmsg(res, "test3", data);
  } catch (error) {
    next(new Error("Something Went Wrong"));
  }
};
const test4 = async (req, res, next) => {
  try {
    let data;
    helper.fmsg(res, "test4", data);
  } catch (error) {
    next(new Error("Something Went Wrong"));
  }
};

module.exports = {
  test1,
  test2,
  test3,
  test4
};
