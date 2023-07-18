const helper = require("../../util/helper");
const { uploadMusic } = require("../services/t9_service");

const upload = async (req, res, next) => {
  try {
    let data = await uploadMusic(req.files, req.body);
    helper.fmsg(res, process.env.SUCCESSFUL, "", { music: data });
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller Error");
  }
};

module.exports = { upload };
