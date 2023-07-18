const helper = require("../../util/helper");
const {
  ShowMemberRequestService,
  memberResponseService
} = require("../services/t19_service");
const { addCatalog } = require("../services/t6_service");
const { showCatalogMembers } = require("../services/t8_service");
const { inviteMemberEmail } = require("../services/t1_service");
const showMemberRequest = async (req, res, next) => {
  try {
    let data = await ShowMemberRequestService(req.body);
    helper.fmsg(res, process.env.SUCCESSFUL, "", data);
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller Error");
  }
};

const responseRequests = async (req, res, next) => {
  try {
    let data = await memberResponseService(req.body);
    helper.fmsg(res, process.env.SUCCESSFUL, "", data);
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller Error");
  }
};

const showMembers = async (req, res, next) => {
  try {
    let data = await showCatalogMembers(req.body);
    helper.fmsg(res, process.env.SUCCESSFUL, "", data);
  } catch (error) {
    console.log(error);
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller Error");
  }
};

const addIdentity = async (req, res, next) => {
  try {
    let data = await addCatalog(req.body);
    helper.fmsg(res, process.env.SUCCESSFUL, "", data);
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller Error");
  }
};

const inviteMember = async (req, res, next) => {
  try {
    let data = await inviteMemberEmail(req.body);
    helper.fmsg(res, process.env.SUCCESSFUL, "", data);
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller Error");
  }
};

module.exports = {
  showMemberRequest,
  responseRequests,
  showMembers,
  addIdentity,
  inviteMember
};
