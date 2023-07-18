const router = require("express").Router();
const controller = require("../access/controller/setting_controller");

//get all music data of owner's catalogs
router.get("/archived", controller.getAllCatSongs);
// router.get("/document", controller.getAllDocuments);

// geeet all catalog roles and permission // need catId
router.post("/permission", controller.getRolesnPermissionByCat);
router.patch("/permission", controller.updatePermissionByCat);

module.exports = router;
