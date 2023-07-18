const { getUser, addUser, inviteUser } = require("../model/t1");
const { getArole, getRolesByCataNOwner } = require("../model/t2");
const { getUserCata } = require("../model/t19");
const { userCata, updateUserCat } = require("../model/t8");
const { ownerCata } = require("../model/t7");
const { sendEmail } = require("./email_service");
const helper = require("../../util/helper");
var bcrypt = require("bcrypt");
const loginS = async (email, password, res) => {
  try {
    let dbUser = await getUser(email);
    if (dbUser) {
      let pswCheck = helper.comparePass(password, dbUser.c3);
      if (pswCheck) {
        let role = await getArole("Owner");
        let cataReq = await getUserCata(dbUser._id);
        let userCatJoin = await userCata(dbUser._id);
        let ownerCat = await ownerCata(dbUser._id);
        let user = dbUser.toObject();
        if (dbUser.c4 && dbUser.c4.equals(role._id)) {
          user.Catalogs = ownerCat;
          //Dashborad go
          user.cat = 0;
        } else if (userCatJoin.length > 0) {
          user.Catalogs = userCatJoin;
          //Catalog go
          user.cat = 1;
        } else if (cataReq.length > 0) {
          //waiting room go
          user.cat = 2;
        } else {
          //catalog join page
          user.cat = 3;
        }
        delete user.c4;
        delete user.c3;
        user.token = helper.token(user);
        delete user.Catalogs;
        return helper.controllerMsg("Login Successful", "", {
          LoginData: user
        });
      } else {
        return helper.controllerMsg("", "Wrong Password");
      }
    } else {
      return helper.controllerMsg("", "Invalid User");
    }
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "S Server Error");
  }
};

const registerS = async (body, res) => {
  try {
    // let role = await getArole("Contributer");
    let dbUser = await getUser(body.c2);
    if (dbUser) {
      return helper.controllerMsg("", "User Alreadt Exit !");
    } else {
      body.c3 = helper.encode(body.c3);
      let userData = await addUser(body);
      userData = userData.toObject();
      delete userData.c3;
      delete userData.c4;
      delete userData.c5;
      delete userData.df;
      delete userData.createdAt;
      delete userData.updatedAt;
      delete userData.__v;
      return helper.controllerMsg("Register Successful!", "", {
        RegisterData: userData
      });
    }
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "S Server Error");
  }
};

const inviteMemberEmail = async body => {
  try {
    let userId = body.user._id;
    if (body.catId) {
      let data = await getRolesByCataNOwner(userId, body.catId);
      return helper.controllerMsg("Register Successful!", "", data);
    } else if (body.email) {
      let name = new Date().valueOf();
      name = "New Member" + name;
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
      var randomString = "";
      for (var i = 0; i < 15; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
      }
      let password = helper.encode(randomString);
      let userId = await inviteUser(name, body.email, body.roleId, password);
      await updateUserCat(body.cataId, userId);
      return helper.controllerMsg("Register Successful!", "", data);
    } else {
      return helper.controllerMsg("", "S Server Error");
    }
  } catch (error) {
    return helper.controllerMsg("", "S Server Error");
  }
};

module.exports = { loginS, registerS, inviteMemberEmail };
