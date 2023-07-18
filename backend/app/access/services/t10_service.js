const helper = require("../../util/helper");
const { addArt, allArt, artById, deleteArtbyId } = require("../model/t10");
const { uploadFile, downloadFile } = require("../controller/file_controller");
const { parse } = require("url");
const saveArtWork = async (body, file) => {
  try {
    let userId = body.user._id;
    let fileName = new Date().valueOf();
    const filePath = await uploadFile(
      process.env.SPACE_NAME,
      fileName,
      file.data,
      file.mimetype,
      `music/artwork/${userId}`
    );
    if (filePath.Location.startsWith("s")) {
      if (filePath.Location.includes(`/${process.env.SPACE_NAME}`)) {
        filePath.Location = filePath.Location.replace(
          `/${process.env.SPACE_NAME}`,
          ""
        );
      }
      filePath.Location =
        `https://${process.env.SPACE_NAME}.` + filePath.Location;
    }
    const actualPath = filePath.Location;
    let art = await addArt(body, actualPath, userId);
    return helper.controllerMsg("Save Scuccessful", "", art);
  } catch (error) {
    return helper.controllerMsg("", "S Server Error", error);
  }
};

const allArtworks = async user => {
  try {
    const userId = user._id;
    let data = await allArt(userId);
    return helper.controllerMsg("Request Scuccessful", "", data);
  } catch (error) {
    return helper.controllerMsg("", "S Server Error");
  }
};

const downloadArt = async (id, res) => {
  try {
    let artData = await artById(id);
    if (artData.error) {
      return helper.controllerMsg("", "M Server Error");
    }
    let name = artData.c1;
    var artl = parse(artData.c3);
    if (artl.path.startsWith("/")) {
      artl = artl.path.slice(1);
    }
    await downloadFile(process.env.SPACE_NAME, artl, res, name);
  } catch (error) {
    return helper.controllerMsg("", "S Server Error");
  }
};

const deleteArt = async id => {
  try {
    let data = await deleteArtbyId(id);
    if (data.error) {
      return helper.controllerMsg("", "M Server Error");
    }
    return helper.controllerMsg("Song Deleted", "", data);
  } catch (error) {
    return helper.controllerMsg("", "S Server Error");
  }
};
module.exports = { saveArtWork, allArtworks, downloadArt, deleteArt };
