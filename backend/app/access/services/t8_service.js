const helper = require("../../util/helper");
const { catalogOwner } = require("../model/t7");
const { catalogMember } = require("../model/t8");

const showCatalogMembers = async body => {
  try {
    let catId = body.catId;
    let owner = await catalogOwner(catId);
    let member = await catalogMember(catId);
    if (owner.error || member.error) {
      return helper.controllerMsg("", "M Server Error");
    }
    return helper.controllerMsg("Request Successful", "", {
      Owner: owner,
      Members: member
    });
  } catch (error) {
    return helper.controllerMsg("", "S8 Server Error");
  }
};

module.exports = { showCatalogMembers };
