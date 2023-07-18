const { getProfile, addProfile } = require("../model/t12");
const helper = require("../../util/helper");

const getUserProfileData = async body => {
  try {
    let data = await getProfile(body.user._id);
    return helper.controllerMsg("Request Successful!", "", data);
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "S Server Error");
  }
};

const addUserProfileData = async body => {
  try {
    let data = await addProfile(body);
    return helper.controllerMsg("Request Successful!", "", data);
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "S Server Error");
  }
};

module.exports = { getUserProfileData, addUserProfileData };
