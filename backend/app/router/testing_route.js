const router = require("express").Router();
const controller = require("../access/controller/cloud_controller");

router.route("/:id").get(controller.download);

module.exports = router;
