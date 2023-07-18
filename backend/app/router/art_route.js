const router = require("express").Router();
const controller = require("../access/controller/art_controller");
const { Schema } = require("../access/validator/vschema");
const {
  validateBody,
  artFileCheck
} = require("../access/middleware/validator");
// router.get("/", controller.all);


//upload artwork route
router.post(
  "/upload_artwork",
  validateBody(Schema.photoBody),
  artFileCheck,
  controller.uploadArtwork
);

// router
//   .route("/:id")
//   .get(controller.get)
//   .patch(controller.patch)
//   .delete(controller.drop);

module.exports = router;
