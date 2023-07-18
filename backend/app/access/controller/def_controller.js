const helper = require("../../util/helper");

const all = async (req, res, next) => {
  try {
    let data;
    helper.fmsg(res, process.env.SUCCESSFUL, "", data);
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller Error");
  }
};

const add = async (req, res, next) => {
  try {
    let data;
    helper.fmsg(res, "", data);
  } catch (error) {
    next(new Error("Something Went Wrong"));
  }
};

const get = async (req, res, next) => {
  try {
    let data;
    helper.fmsg(res, "", data);
  } catch (error) {
    next(new Error("Something Went Wrong"));
  }
};

const patch = async (req, res, next) => {
  try {
    let data;
    helper.fmsg(res, "", data);
  } catch (error) {
    next(new Error("Something Went Wrong"));
  }
};

const drop = async (req, res, next) => {
  try {
    let data;
    helper.fmsg(res, "", data);
  } catch (error) {
    next(new Error("Something Went Wrong"));
  }
};

module.exports = {
  all,
  add,
  get,
  patch,
  drop
};
