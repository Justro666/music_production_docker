const helper = require("../../util/helper");
const {
  getSongs,
  downloadSong,
  deleteSong
} = require("../services/t9_service");
const {
  allArtworks,
  downloadArt,
  deleteArt
} = require("../services/t10_service");
const { getAllProjects } = require("../services/t11_service");
const allSong = async (req, res, next) => {
  try {
    let data = await getSongs(req.body.user);
    helper.fmsg(res, process.env.SUCCESSFUL, "", data);
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller  Error");
  }
};

const allArtwork = async (req, res, next) => {
  try {
    let data = await allArtworks(req.body.user);
    helper.fmsg(res, process.env.SUCCESSFUL, "", data);
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller  Error");
  }
};

const allProject = async (req, res, next) => {
  try {
    let data = await getAllProjects(req.body.user, 2);
    helper.fmsg(res, process.env.SUCCESSFUL, "", data);
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller  Error");
  }
};

const download = async (req, res, next) => {
  try {
    const body = req.body;
    if (body.musicId) {
      await downloadSong(body.musicId, res);
    } else if (body.artId) {
      await downloadArt(body.artId, res);
    } else {
      helper.fmsg(res, process.env.SERVER_ERROR, "Controller  Error");
    }
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller  Error");
  }
};

const deleteData = async (req, res, next) => {
  try {
    const body = req.body;
    if (body.musicId) {
      let data = await deleteSong(body.musicId, res);
      helper.fmsg(res, process.env.SUCCESSFUL, "", data);
    } else if (body.artId) {
      let data = await deleteArt(body.artId, res);
      helper.fmsg(res, process.env.SUCCESSFUL, "", data);
    } else {
      helper.fmsg(res, process.env.SERVER_ERROR, "Controller  Error");
    }
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, "Controller  Error");
  }
};

module.exports = { allSong, allArtwork, allProject, download, deleteData };
