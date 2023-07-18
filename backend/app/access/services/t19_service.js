const { reqCata, userRequestByCatId, updateStatus } = require("../model/t19");
const { updateUserCat } = require("../model/t8");
const helper = require("../../util/helper");

const request = async body => {
  try {
    let data = await reqCata(body);
    return helper.controllerMsg("Request Successful", "", data);
  } catch (error) {
    return helper.controllerMsg("", "Request Failed");
  }
};

const ShowMemberRequestService = async body => {
  try {
    let cataId = body.catId;
    let data = await userRequestByCatId(cataId);
    return helper.controllerMsg("Request Successful", "", data);
  } catch (error) {
    return helper.controllerMsg("", "Request Failed");
  }
};

const memberResponseService = async body => {
  try {
    let data;
    let requestId = body.requestId;
    let cataId = body.catId;
    let userId = body.userId;
    let response = body.c3;
    if (response == 1) {
      await updateUserCat(cataId, userId);
      let data = await updateStatus(requestId, response);
      if (data.error) {
        return helper.controllerMsg("", "M Service Error");
      }
      return helper.controllerMsg("Request Successful", "", data);
    } else if (response == 2) {
      let data = await updateStatus(requestId, response);
      if (data.error) {
        return helper.controllerMsg("", "M Service Error");
      }
      return helper.controllerMsg("Request Successful", "", data);
    } else {
      return helper.controllerMsg("", "Request Failed");
    }
  } catch (error) {
    return helper.controllerMsg("", "Request Failed");
  }
};

module.exports = { request, ShowMemberRequestService, memberResponseService };
