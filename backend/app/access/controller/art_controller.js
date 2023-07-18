const helper = require("../../util/helper");
const { saveArtWork } = require("../services/t10_service");
const uploadArtwork = async (req, res, next) => {
  try {
    const file = req.files.photo;

    let realData = await saveArtWork(req.body, file);
    helper.fmsg(res, process.env.SUCCESSFUL, "", { Art: realData });
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller Error");
  }
};

module.exports = { uploadArtwork };
