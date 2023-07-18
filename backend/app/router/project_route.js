const router = require("express").Router();
const controller = require("../access/controller/project_controller");
const { validateBody } = require("../access/middleware/validator");
const { Schema } = require("../access/validator/vschema");

//songs for prog management page
router.get("/project_management", controller.allSongs);

//add music data in project management page
router.post(
  "/music_data",
  validateBody(Schema.projectData),
  controller.addProject
);
//update music and projet status in music data preview page
router.patch("/music_data", controller.requestAdminFromPreview);
//download zip
router.patch("/music_data_preview", controller.downloadZip);
//music data preview page
router.post("/music_data_preview", controller.projectPreview);

//send image base64 for music data preview
router.delete("/music_data_preview", controller.download);
//update photo at music data preview
router.delete("/music_data", controller.updateImageMusicData);

module.exports = router;
