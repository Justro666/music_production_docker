const helper = require("../../util/helper");
const { getSongs } = require("../services/t9_service");
const {
  addProjectData,
  projectByMusic,
  reqUpdateProjandMusic,
  downloadZipFile,
  downloadSrcArt,
  getProjectByCata
} = require("../services/t11_service");
const allSongs = async (req, res, next) => {
  try {
    let data = await getSongs(req.body.user);
    helper.fmsg(res, process.env.SUCCESSFUL, "", data);
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller  Error");
  }
};

const addProject = async (req, res, next) => {
  try {
    let data = await addProjectData(req.body);
    helper.fmsg(res, process.env.SUCCESSFUL, "", data);
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller  Error");
  }
};

const projectPreview = async (req, res, next) => {
  // helper.fmsg(res, process.env.SUCCESSFUL, req.body);
  try {
    let data = await projectByMusic(req.body);
    helper.fmsg(res, process.env.SUCCESSFUL, "", data);
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller  Error");
  }
};

const requestAdminFromPreview = async (req, res, next) => {
  try {
    let data = await reqUpdateProjandMusic(req.body);
    helper.fmsg(res, process.env.SUCCESSFUL, "", data);
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller  Error");
  }
};

const downloadZip = async (req, res, next) => {
  try {
    await downloadZipFile(req.body, req.files, res);
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller  Error");
  }
};

const download = async (req, res, next) => {
  try {
    const body = req.body;
    await downloadSrcArt(body.artId, res);
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller  Error");
  }
};

const updateImageMusicData = async (req, res, next) => {};

const getProjForCata = async (req, res, next) => {
  try {
    let data = await getProjectByCata(req.body.catId);
    helper.fmsg(res, process.env.SUCCESSFUL, "", data);
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller  Error");
  }
};
module.exports = {
  allSongs,
  addProject,
  addProject,
  projectPreview,
  requestAdminFromPreview,
  downloadZip,
  download,
  updateImageMusicData,
  getProjForCata
};
