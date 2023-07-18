const router = require("express").Router();
const controller = require("../access/controller/catalog_controller");
const controller2 = require("../access/controller/project_controller");
const {
  validateToken,
  validatePermission
} = require("../access/middleware/validator");

//get  all catalog
router.get("/all_cata", controller.getCatalog);

//user request to join for catalog
router.post("/req_cata", controller.requestCata);

//Catalogs for MusicData Page
router.get("/userCata", validateToken, controller.getCataForMusic);

//catalog data for identity card and catalog page
router.get(
  "/fullUserCatalog",
  validateToken,
  validatePermission,
  controller.getCataDetail
);

//in main catalog page need projects by catalog
router.post(
  "/cataMusic",
  validateToken,
  validatePermission,
  controller2.getProjForCata
);

module.exports = router;
