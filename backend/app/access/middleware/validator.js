const jwt = require("jsonwebtoken");
const helper = require("../../util/helper");
const userModel = require("../model/t1");
const pageModel = require("../model/t4");
const { t3 } = require("../model/t3");

module.exports = {
  validateBody: schema => {
    return (req, res, next) => {
      let result = schema.validate(req.body);
      if (result.error) {
        helper.fmsg(res, process.env.SUCCESSFUL, "", {
          error: result.error.details[0].message
        });
      } else {
        next();
      }
    };
  },
  validateParams: (schema, params) => {
    return (req, res, next) => {
      let data = {};
      data[`${params}`] = req.params[`${params}`];
      let result = schema.validate(data);
      if (result.error) {
        helper.fmsg(res, process.env.SUCCESSFUL, "", {
          error: result.error.details[0].message
        });
      } else {
        next();
      }
    };
  },
  validateToken: async (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let token1 = token.replace(/^"(.*)"$/, "$1");
      let decoded = jwt.decode(token1, process.env.SECRET_KEY);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (decoded != null && decoded.exp > currentTimestamp) {
        let user = await userModel.t1.findById(decoded._id).select("c1 c2");
        if (user) {
          user = user.toObject();
          user.catalogs = decoded.catalogs;
          req.body["user"] = user;
          next();
        } else {
          helper.fmsg(res, process.env.SUCCESSFUL, "", {
            error: "Wrong User. Please Login!"
          });
        }
      } else {
        helper.fmsg(res, process.env.SUCCESSFUL, "", {
          error: "Token Expire. Please Login !"
        });
      }
    } else {
      helper.fmsg(res, process.env.SUCCESSFUL, "", {
        error: "Tokenization Error. Please login !"
      });
    }
  },
  validatePermission: async (req, res, next) => {
    let page = req.url;
    page = page.split("/")[2];
    let pageData = await pageModel.t4.findOne({ c1: page });
    let userData = await userModel.t1
      .findOne({ _id: req.body.user._id })
      .select("c1 c4")
      .populate("c4");
    if (userData.c4) {
      let permissionName = userData.c4.c1;
      let userPermission = userData.c4.c4;

      if (pageData != null && userPermission.length > 0) {
        let pageId = pageData._id;
        let pageInclude = false;
        let permit = null;
        for (let i = 0; i < userPermission.length; i++) {
          let permissionData = await t3.findOne({
            _id: userPermission[i]
          });
          pageInclude = permissionData.c2.some(page => page.equals(pageId));
          permit = permissionData.c3;
          if (pageInclude) {
            break;
          }
        }

        const method = req.method;
        const methods = ["POST", "PATCH", "DELETE"];
        if (permissionName == "Owner") {
          delete req.body.no;
          delete req.body.page;
          req.body["access"] = permit;
          next();
        } else if (pageInclude) {
          if ((permit == 0) & !methods.includes(method)) {
            delete req.body.no;
            delete req.body.page;
            req.body["access"] = permit;
            next();
          } else if (permit == 1) {
            delete req.body.no;
            delete req.body.page;
            req.body["access"] = permit;
            next();
          } else {
            helper.fmsg(res, process.env.SUCCESSFUL, "", {
              error: "No Access !",
              msg: 2
            });
          }
        } else {
          helper.fmsg(res, process.env.SUCCESSFUL, "", {
            error: "No Access !",
            msg: 2
          });
        }
      } else {
        helper.fmsg(res, process.env.SUCCESSFUL, "", {
          error: "Wrong Request !",
          msg: 2
        });
      }
    } else {
      helper.fmsg(res, process.env.SUCCESSFUL, "", {
        error: "No Permission !",
        msg: 2
      });
    }
  },
  permitCheck: async (req, res, next) => {
    let page = req.body.page;
    let pageData = await pageModel.t4.findOne({ c1: page });
    let userData = await userModel.t1
      .findOne({ _id: req.body.user._id })
      .select("c1 c4")
      .populate("c4");
    let userPermission = userData.c4.c4;
    if (pageData != null && userPermission.length > 0) {
      let pageId = pageData._id;
      let pageInclude = false;
      let permit = null;
      for (let i = 0; i < userPermission.length; i++) {
        let permissionData = await t3.findOne({
          _id: userPermission[i]
        });
        pageInclude = permissionData.c2.some(page => page.equals(pageId));
        permit = permissionData.c3;
        if (pageInclude) {
          break;
        }
      }
      const method = req.body.method;
      const methods = ["POST", "PATCH", "DELETE"];
      if (pageInclude) {
        if ((permit == 0) & !methods.includes(method)) {
          helper.fmsg(res, process.env.SUCCESSFUL, "", {
            msg: 0
          });
        } else if (permit == 1) {
          helper.fmsg(res, process.env.SUCCESSFUL, "", {
            msg: 1
          });
        } else {
          helper.fmsg(res, process.env.SUCCESSFUL, "", { msg: 2 });
        }
      } else {
        helper.fmsg(res, process.env.SUCCESSFUL, "", { msg: 2 });
      }
    } else {
      helper.fmsg(res, process.env.SUCCESSFUL, "", { msg: 2 });
    }
  },
  musicFileCheck: async (req, res, next) => {
    let files = req.files.files;
    let music = req.files.music;
    if (!files) {
      helper.fmsg(res, process.env.SUCCESSFUL, "", {
        error: "File is required"
      });
    } else if (!music) {
      helper.fmsg(res, process.env.SUCCESSFUL, "", {
        error: "Music is required"
      });
    } else if (
      music.mimetype != "audio/wav" &&
      music.mimetype != "audio/mpeg"
    ) {
      helper.fmsg(res, process.env.SUCCESSFUL, "", {
        error: "Music must be wav or mp3 file"
      });
    } else if (
      files.mimetype != "application/pdf" &&
      files.mimetype != "image/png" &&
      files.mimetype != "text/plain" &&
      files.mimetype != "image/jpeg"
    ) {
      helper.fmsg(res, process.env.SUCCESSFUL, "", {
        error: "File must be pdf or png file"
      });
    } else {
      next();
    }
  },
  artFileCheck: async (req, res, next) => {
    let photo = req.files.photo;
    if (photo.mimetype != "image/jpeg" && photo.mimetype != "image/png") {
      helper.fmsg(res, process.env.SUCCESSFUL, "", {
        error: "File must be jepg or png file"
      });
    } else {
      next();
    }
  }
};
