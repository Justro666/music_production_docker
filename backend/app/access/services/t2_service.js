const helper = require("../../util/helper");
const {
  createRoles,
  getRolesByCataNOwner,
  updatePermissionByCat
} = require("../model/t2");
const { getPermissionsData } = require("../model/t3");
const addRoles = async (catId, userId) => {
  try {
    let roles = [
      { c1: "Singer", c2: userId, c3: catId, c4: [] },
      { c1: "Writer", c2: userId, c3: catId, c4: [] },
      { c1: "Manager", c2: userId, c3: catId, c4: [] },
      { c1: "Lawyer", c2: userId, c3: catId, c4: [] },
      { c1: "Member", c2: userId, c3: catId, c4: [] },
      { c1: "Designer", c2: userId, c3: catId, c4: [] },
      { c1: "Contributer", c2: userId, c3: catId, c4: [] }
    ];
    let data = await createRoles(roles);
    return data;
  } catch (error) {
    return "Error";
  }
};

const rolesNPermitByCat = async (userId, id) => {
  try {
    let roles = await getRolesByCataNOwner(userId, id);
    let permissions = await getPermissionsData();
    if (roles.error || permissions.error) {
      return helper.controllerMsg("", "M Server Error");
    } else {
      return helper.controllerMsg("All Datas", "", {
        Roles: roles,
        Permissions: permissions
      });
    }
  } catch (error) {
    return helper.controllerMsg("", "S Server Error");
  }
};

const updateRolePermission = async body => {
  try {
    let permissions = body.permissions;
    let catId = body.catId;
    let permissionsD = [];
    for (let i = 0, length = permissions.length; i < length; i += 1) {
      permissionsD = [];
      let roleId = permissions[i]._id;
      for (let j = 0, length = permissions[i].c4.length; j < length; j += 1) {
        if (permissions[i].c4[j]._id != "") {
          permissionsD.push(permissions[i].c4[j]._id);
        }
      }
      await updatePermissionByCat(catId, roleId, permissionsD);
    }
    return helper.controllerMsg("Update Successful", "");
  } catch (error) {
    return helper.controllerMsg("", "S Server Error");
  }
};

module.exports = { addRoles, rolesNPermitByCat, updateRolePermission };
