const helper = require("../../util/helper");
const {
  addMusic,
  getAllSongs,
  getSongbyId,
  deleteSongbyId
} = require("../model/t9");
const { uploadFile, downZipFile } = require("../controller/file_controller");
const mime = require("mime-types");
const { PassThrough } = require("stream");
const archiver = require("archiver");
const { parse } = require("url");
const fs = require("fs");

const songFileExtension = {
  "audio/wav": "wav",
  "audio/mpeg": "mp3"
};
const uploadMusic = async (file, body) => {
  try {
    console.log(body);
    let userId = body.user._id;
    const files = file.files;
    let docPath = [];
    let fileName = new Date().valueOf();
    if (Array.isArray(files)) {
      for (let i = 0; i < files.length; i++) {
        const pdfPath = await uploadFile(
          process.env.SPACE_NAME,
          fileName,
          files[i].data,
          files[i].mimetype,
          `music/song_doc/${userId}`
        );
        if (pdfPath.Location.startsWith("s")) {
          if (pdfPath.Location.includes(`/${process.env.SPACE_NAME}`)) {
            pdfPath.Location = pdfPath.Location.replace(
              `/${process.env.SPACE_NAME}`,
              ""
            );
          }
          pdfPath.Location =
            `https://${process.env.SPACE_NAME}.` + pdfPath.Location;
        }
        const actualPath = pdfPath.Location;
        docPath.push(actualPath);
      }
    } else {
      const pdfPath = await uploadFile(
        process.env.SPACE_NAME,
        fileName,
        files.data,
        files.mimetype,
        `music/music_doc/${userId}`
      );

      if (pdfPath.Location.startsWith("s")) {
        if (pdfPath.Location.includes(`/${process.env.SPACE_NAME}`)) {
          pdfPath.Location = pdfPath.Location.replace(
            `/${process.env.SPACE_NAME}`,
            ""
          );
        }
        pdfPath.Location =
          `https://${process.env.SPACE_NAME}.` + pdfPath.Location;
      }
      const actualPath = pdfPath.Location;
      docPath.push(actualPath);
    }

    const musicPath = await uploadFile(
      process.env.SPACE_NAME,
      fileName,
      file.music.data,
      file.music.mimetype,
      `music/musics/${userId}`
    );
    if (musicPath.Location.startsWith("s")) {
      if (musicPath.Location.includes(`/${process.env.SPACE_NAME}`)) {
        musicPath.Location = musicPath.Location.replace(
          `/${process.env.SPACE_NAME}`,
          ""
        );
      }
      musicPath.Location =
        `https://${process.env.SPACE_NAME}.` + musicPath.Location;
    }
    const musicactPath = musicPath.Location;
    const data = await addMusic(body, musicactPath, docPath, userId);
    return helper.controllerMsg("Save Successful", "", data);
  } catch (error) {
    console.log(error);
    return helper.controllerMsg("", "Save error", error);
  }
};

const getSongs = async user => {
  try {
    let id = user._id;
    let data = await getAllSongs(id);
    return helper.controllerMsg("All Songs", "", data);
  } catch (error) {
    return helper.controllerMsg("", "S Server Error");
  }
};

const downloadSong = async (id, res) => {
  try {
    let songData = await getSongbyId(id);
    let songDoc = songData.c3;
    var songl = parse(songData.c2);
    if (songl.path.startsWith("/")) {
      songl = songl.path.slice(1);
    }
    let song = await downZipFile(process.env.SPACE_NAME, songl);
    song.name = songData.c1 + "." + songFileExtension[song.ContentType];
    song.data = song.Body;
    const files = [song];
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
    let archive = archiver.create("zip", {
      zlib: { level: 9 }
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
      "Content-Disposition": 'attachment; filename="zippedFiles.zip"',
      "Cache-Control": "no-cache",
      Pragma: "no-cache"
    });

    // Pipe the memory stream to the response
    memStream.pipe(res);
  } catch (error) {
    return helper.controllerMsg("", "S Server Error");
  }
};

const deleteSong = async id => {
  try {
    let data = await deleteSongbyId(id);
    return helper.controllerMsg("Song Deleted", "", data);
  } catch (error) {
    return helper.controllerMsg("", "S Server Error");
  }
};
module.exports = {
  uploadMusic,
  getSongs,
  downloadSong,
  deleteSong
};
