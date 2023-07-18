const router = require("express").Router();
const controller = require("../access/controller/user_profile_controller");

router.get("/user_profile", controller.getUserProfile);
router.post("/user_profile", controller.addUserProfile);

module.exports = router;
