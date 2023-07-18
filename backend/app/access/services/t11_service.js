const helper = require("../../util/helper");
const {
  downZipFile,
  downloadSrcFile
} = require("../controller/file_controller");
const mime = require("mime-types");
const { PassThrough } = require("stream");
const archiver = require("archiver");
const {
  allProjectbyUser,
  addProject,
  projectDatabyMusic,
  updateProjectStatus,
  updateProjectImage,
  projDataByCat
} = require("../model/t11");
const { updateSongStatus, getSongbyId } = require("../model/t9");
const { artById } = require("../model/t10");
const { parse } = require("url");
archiver.registerFormat("zip-encrypted", require("archiver-zip-encrypted"));
const getAllProjects = async (user, status) => {
  try {
    let id = user._id;
    let data = await allProjectbyUser(id, status);
    return helper.controllerMsg("All Projects", "", data);
  } catch (error) {
    return helper.controllerMsg("", "S Server Error");
  }
};

const addProjectData = async body => {
  try {
    let userId = body.user._id;
    let songId = body.c7;
    let status = body.c21;
    let data = await addProject(body, userId);
    let data2 = await updateSongStatus(songId, status);
    if (data.error || data2.error) {
      return helper.controllerMsg("", "M Server Error");
    }
    return helper.controllerMsg("Project Added", "", {
      Project: data,
      Music: data2
    });
  } catch (error) {
    return helper.controllerMsg("", "S Server Error");
  }
};

const projectByMusic = async body => {
  try {
    let songId = body.songId;
    let data = await projectDatabyMusic(songId);
    return helper.controllerMsg("Request Successful", "", data);
  } catch (error) {
    return helper.controllerMsg("", "S Server Error");
  }
};

const reqUpdateProjandMusic = async body => {
  try {
    if (body.artId) {
      let projectId = body.projId;
      let artId = body.artId;
      let data = await updateProjectImage(projectId, artId);
      return helper.controllerMsg("Request Successful", "", data);
    } else {
      let songId = body.songId;
      let projectId = body.projId;
      let status = body.status;
      let data = await updateProjectStatus(projectId, status);
      let data2 = await updateSongStatus(songId, status);
      if (data.error || data2.error) {
        return helper.controllerMsg("", "M Server Error");
      }
      return helper.controllerMsg("Request Successful", "", data2);
    }
  } catch (error) {
    return helper.controllerMsg("", "S Server Error");
  }
};

const downloadZipFile = async (body, folder, res) => {
  try {
    const songFileExtension = {
      "audio/wav": "wav",
      "audio/mpeg": "mp3"
    };
    let songLink = await getSongbyId(body.musicId);
    let art = await artById(body.artId);
    let songDoc = songLink.c3;
    var artl = parse(art.c3);
    if (artl.path.startsWith("/")) {
      artl = artl.path.slice(1);
    }

    var songl = parse(songLink.c2);
    if (songl.path.startsWith("/")) {
      songl = songl.path.slice(1);
    }

    let song = await downZipFile(process.env.SPACE_NAME, songl);
    song.name = songLink.c1 + "." + songFileExtension[song.ContentType];
    song.data = song.Body;
    let artFile = await downZipFile(process.env.SPACE_NAME, artl);
    artFile.name = art.c1;
    artFile.data = artFile.Body;

    console.log(folder);
    // const zip = new JSZip();
    const files = [song, artFile];
    if (folder != null) {
      files.push(folder.file);
    }
    if (songDoc.length > 0) {
      for (let i = 0; i < songDoc.length; i++) {
        let songDoclink = parse(songDoc[i]);
        if (songDoclink.path.startsWith("/")) {
          songDoclink = songDoclink.path.slice(1);
        }
        let data = await downZipFile(process.env.SPACE_NAME, songDoclink);
        data.name =
          "Song Document " + (i + 1) + "." + mime.extension(data.ContentType);
        data.data = data.Body;
        files.push(data);
      }
    }

    const memStream = new PassThrough();
    // Create an archiver instance
    let archive = archiver.create("zip-encrypted", {
      zlib: { level: 8 },
      encryptionMethod: "aes256",
      password: body.user.c2
    });
    // Pipe the archive to the output stream
    archive.pipe(memStream);
    // Add files to the archive
    for (const file of files) {
      archive.append(file.data, {
        name: file.name
      });
    }
    // Finalize the archive
    archive.finalize();
    // Set the response headers
    res.set({
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="zippedFiles.zip"'
    });

    // Pipe the memory stream to the response
    memStream.pipe(res);

    // for (const file of files) {
    //   zip.file(file.name + "." + mime.extension(file.ContentType), file.data);
    // }
    // // Generate the zipped file
    // const zipFile = await zip.generateAsync({
    //   encryption: "password",
    //   password: "12345",
    //   type: "nodebuffer"
    // });

    // res.set({
    //   "Content-Type": "application/zip",
    //   "Content-Disposition": 'attachment; filename="zippedFiles.zip"'
    // });
    // c
  } catch (error) {
    return helper.controllerMsg("", "S Server Error");
  }
};

const downloadSrcArt = async (id, res) => {
  try {
    let artData = await artById(id);
    let name = artData.c1;
    if (artData.error) {
      return helper.controllerMsg("", "M Server Error");
    }
    var artl = parse(artData.c3);
    if (artl.path.startsWith("/")) {
      artl = artl.path.slice(1);
    }
    console.log(artl);
    await downloadSrcFile(process.env.SPACE_NAME, artl, res, name);
  } catch (error) {
    return helper.controllerMsg("", "S Server Error");
  }
};

const getProjectByCata = async id => {
  try {
    let data = await projDataByCat(id);
    return helper.controllerMsg("Request Successful", "", data);
  } catch (error) {
    return helper.controllerMsg("", "S Server Error");
  }
};

module.exports = {
  getAllProjects,
  addProjectData,
  projectByMusic,
  reqUpdateProjandMusic,
  downloadZipFile,
  downloadSrcArt,
  getProjectByCata
};
