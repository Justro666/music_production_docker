const router = require("express").Router();
const controller = require("../access/controller/cloud_controller");
const controller2 = require("../access/controller/project_controller");
router.get("/songrecording_collection", controller.allSong);
router.get("/artwork_collection", controller.allArtwork);
router.get("/project_collection", controller.allProject);

//downloads
router.post("/songrecording_collection", controller.download); //need musicId
router.post("/artwork_collection", controller.download); //need artId

//download project zip from cloud route project collection pagge
router.post("/project_collection", controller2.downloadZip);
// router.post("/", controller.add);

//delete
router.delete("/songrecording_collection", controller.deleteData); //need musicId
router.delete("/artwork_collection", controller.deleteData); //need artId
// router
//   .route("/:id")
//   .get(controller.get)
//   .patch(controller.patch)
//   .delete(controller.drop);

module.exports = router;
