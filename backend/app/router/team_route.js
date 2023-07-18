const router = require("express").Router();
const controller = require("../access/controller/team_controller");
const controller2 = require("../access/controller/catalog_controller");

router.post("/team_member_list", controller.showMembers);
router.patch("/team_member_list", controller.inviteMember);

router.post("/team_request_list", controller.showMemberRequest);
router.patch("/team_request_list", controller.responseRequests);
router.post("/identity", controller.addIdentity);
router.get("/identity", controller2.getCataDetail);

module.exports = router;
