const router = require("express").Router();
const controller = require("../access/controller/music_controller");
const { Schema } = require("../access/validator/vschema");
const {
  validateBody,
  musicFileCheck
} = require("../access/middleware/validator");

router.post(
  "/upload_music",
  validateBody(Schema.musicUploadTitle),
  musicFileCheck,
  controller.upload
);

module.exports = router;
