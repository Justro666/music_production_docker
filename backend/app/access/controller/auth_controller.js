const helper = require("../../util/helper");
const { loginS, registerS } = require("../services/t1_service");

const loginC = async (req, res, next) => {
  try {
    let User = await loginS(req.body.c2, req.body.c3, res);
    helper.fmsg(res, process.env.SUCCESSFUL, "", User);
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller Error");
  }
};
const register = async (req, res, next) => {
  try {
    let data = await registerS(req.body, res);
    helper.fmsg(res, process.env.SUCCESSFUL, "", data);
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller Error");
  }
};

module.exports = {
  register,
  loginC
};
