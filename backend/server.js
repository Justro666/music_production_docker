const express = require("express"),
  app = express(),
  mongoose = require("mongoose");

const fileUpload = require("express-fileupload");
require("dotenv").config();

const ObjectId = require("mongoose").Types.ObjectId;
mongoose.connect(
  `mongodb+srv://doadmin:Gr6jD927s4mP081Q@mongo-db-6cb5df94.mongo.ondigitalocean.com/${process
    .env.DB_NAME}?tls=true&authSource=admin&replicaSet=mongo-db`
);
app.use(express.json());
app.use(fileUpload());
// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//call middlewares
const {
  validateToken,
  validatePermission,
  permitCheck
} = require("./app/access/middleware/validator");

//Login and Register
const auth = require("./app/router/auth_route");
app.use("/auth", auth);

//Catlogs for request
const route3 = require("./app/router/catalog_route");
app.use("/cat", route3);
// const test = require("./app/router/testing_route");
// app.use("/download", test);
//Token Middleware
app.use(validateToken);

//Permission Checking Route
app.use("/permitCheck", permitCheck);

//Validate CRUD Permission Middleware
app.use(validatePermission);

const route1 = require("./app/router/music_route");
const route2 = require("./app/router/art_route");
const route4 = require("./app/router/cloud_route");
const route5 = require("./app/router/project_route");
const route6 = require("./app/router/team_route");
const route7 = require("./app/router/user_profile_route");
const route8 = require("./app/router/setting_route");

//music route
app.use("/music", route1);
//art route
app.use("/art", route2);
//personal cloud route
app.use("/cloud", route4);
//project management route
app.use("/project", route5);
// team management route
app.use("/team", route6);
app.use("/profile", route7);
app.use("/setting", route8);
app.use("/*", validatePermission);

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  res.status(err.status).json({ con: false, msg: err.message });
});
app.listen(process.env.PORT, () =>
  console.log(`Server is running on  http://localhost:${process.env.PORT}`)
);
