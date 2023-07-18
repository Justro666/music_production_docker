const helper = require("../../util/helper");
const { getAllProjects } = require("../services/t11_service");
const {
  rolesNPermitByCat,
  updateRolePermission
} = require("../services/t2_service");
const getAllCatSongs = async (req, res, next) => {
  try {
    let data = await getAllProjects(req.body.user, 1);
    helper.fmsg(res, process.env.SUCCESSFUL, "", data);
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller Error");
  }
};

const getRolesnPermissionByCat = async (req, res, next) => {
  try {
    let data = await rolesNPermitByCat(req.body.user._id, req.body.catId);
    // console.log(data);
    helper.fmsg(res, process.env.SUCCESSFUL, "", data);
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller Error");
  }
};

const updatePermissionByCat = async (req, res, next) => {
  try {
    let data = await updateRolePermission(req.body);
    helper.fmsg(res, process.env.SUCCESSFUL, "", data);
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller Error");
  }
};

// $or: [{ c3: 0 }];
module.exports = {
  getAllCatSongs,
  getRolesnPermissionByCat,
  updatePermissionByCat
};
