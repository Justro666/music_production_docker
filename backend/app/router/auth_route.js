const router = require("express").Router();
const controller = require("../access/controller/auth_controller");
const { validateBody } = require("../access/middleware/validator");
const { Schema } = require("../access/validator/vschema");

//registe route
router.post("/register", [
  validateBody(Schema.createAccount),
  controller.register
]);

//login route
router.post("/login", [validateBody(Schema.loginUser), controller.loginC]);

module.exports = router;
