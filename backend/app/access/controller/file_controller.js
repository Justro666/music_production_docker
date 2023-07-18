const helper = require("../../util/helper");
const AWS = require("aws-sdk");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

AWS.config.update({
  accessKeyId: "DO00VUPC3AW27G7VK7N9",
  secretAccessKey: "/bChgRYK2QeUdlBqXznyERf+MBt9nMXtYrPz3Zk5spo",
  endpoint: "https://sgp1.digitaloceanspaces.com"
});

//exbrain.sgp1.digitaloceanspaces.com

const s3 = new AWS.S3();
const downloadFile = async (bucketName, filePath, res, file) => {
  try {
    // const filePath = "lectureNotes/testing_music.flac";
    const params = { Bucket: bucketName, Key: filePath };
    const data = await s3.getObject(params).promise();
    const fileBuffer = data.Body;
    const type = data.ContentType;
    res.setHeader("Content-Type", type);
    res.setHeader("Content-Disposition", `attachment; filename=${file}`);
    res.send(fileBuffer);
  } catch (error) {
    return helper.controllerMsg("System Error", error);
  }
};

const downloadSrcFile = async (bucketName, filePath, res, file) => {
  try {
    // const filePath = "lectureNotes/testing_music.flac";
    const params = { Bucket: bucketName, Key: filePath };
    const data = await s3.getObject(params).promise();
    const fileBuffer = data.Body;
    const type = data.ContentType;
    const base64Image = fileBuffer.toString("base64");
    res.send({ image: base64Image, contentType: type });
  } catch (error) {
    return helper.controllerMsg("System Error", error);
  }
};

const uploadFile = async (
  bucketName,
  fileName,
  fileData,
  contentType,
  filePaths
) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: filePaths + "/" + fileName,
      Body: fileData,
      ACL: "public-read",
      ContentType: contentType,
      ContentDisposition: "inline"
    };
    const filePath = await s3.upload(params).promise();
    return filePath;
  } catch (error) {
    return helper.controllerMsg("System Error", error);
  }
};

//download and return file for zip
const downZipFile = async (bucketName, filePath) => {
  try {
    const params = { Bucket: bucketName, Key: filePath };
    const data = await s3.getObject(params).promise();
    const fileBuffer = data;
    return fileBuffer;
  } catch (error) {
    return helper.controllerMsg("System Error", error);
  }
};

module.exports = {
  downloadFile,
  uploadFile,
  downZipFile,
  downloadSrcFile
};
