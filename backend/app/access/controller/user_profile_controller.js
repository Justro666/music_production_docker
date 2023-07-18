const helper = require("../../util/helper");
const {
  getUserProfileData,
  addUserProfileData
} = require("../services/t12_service");

const getUserProfile = async (req, res, next) => {
  try {
    let data = await getUserProfileData(req.body);
    helper.fmsg(res, process.env.SUCCESSFUL, "", data);
  } catch (error) {
    console.log(error);
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller Error");
  }
};

const addUserProfile = async (req, res, next) => {
  try {
    let data = await addUserProfileData(req.body);
    helper.fmsg(res, process.env.SUCCESSFUL, "", data);
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller Error");
  }
};
module.exports = { getUserProfile, addUserProfile };
