const helper = require("../../util/helper");
const { getAll } = require("../model/t6");
const { addRoles } = require("./t2_service");
const { ownerCataData, addOwnerCata, ownerCataDatas } = require("../model/t7");
const { userCataData, userCataDatas, addUserCata } = require("../model/t8");
const { addCatalogIdentity } = require("../model/t6");
const getAllCatalog = async () => {
  try {
    let data = await getAll();
    if (data.error) {
      return helper.controllerMsg("", "M Server Error");
    }
    return helper.controllerMsg("All Catalog", "", data);
  } catch (error) {
    return helper.controllerMsg("", "S Server Error");
  }
};

const userCataDetail = async user => {
  try {
    let userId = user._id;
    let data;
    let userData = await userCataData(userId);
    let ownerData = await ownerCataData(userId);
    if (ownerData.length > 0) {
      data = ownerData;
      return helper.controllerMsg("Catalog Data", "", data);
    } else if (userData.length > 0) {
      data = userData;
      return helper.controllerMsg("Catalog Data", "", data);
    } else {
      return helper.controllerMsg("", "M Server Error");
    }
  } catch (error) {
    return helper.controllerMsg("", "S Server Error");
  }
};

const userCataDetails = async user => {
  try {
    let userId = user._id;
    let data;
    let userData = await userCataDatas(userId);
    let ownerData = await ownerCataDatas(userId);
    if (ownerData.length > 0) {
      data = ownerData;
      return helper.controllerMsg("Catalog Data", "", data);
    } else if (userData.length > 0) {
      data = userData;
      return helper.controllerMsg("Catalog Data", "", data);
    } else {
      return helper.controllerMsg("", "M Server Error");
    }
  } catch (error) {
    return helper.controllerMsg("", "S Server Error");
  }
};

const addCatalog = async body => {
  try {
    let userId = body.user._id;
    delete body.user;
    delete body.access;
    let cataId = await addCatalogIdentity(body);
    if (cataId) {
      let cata1 = await addOwnerCata(cataId, userId);
      let cata2 = await addUserCata(cataId);
      let cata3 = await addRoles(cataId, userId);
      if (cataId.error || cata1.error || cata2.error || cata3.error) {
        return helper.controllerMsg("", "M Server Error");
      }
      return helper.controllerMsg("Successful", "", { CatalogId: cataId });
    } else {
      return helper.controllerMsg("", "M Server Error");
    }
  } catch (error) {
    console.log(error);
    return helper.controllerMsg("", "S Server Error");
  }
};

module.exports = {
  getAllCatalog,
  userCataDetail,
  addCatalog,
  userCataDetails
};
