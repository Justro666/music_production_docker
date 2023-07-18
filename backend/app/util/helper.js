const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const Redis = require("async-redis").createClient();

module.exports = {
  fmsg: (res, status, err = "", result = []) =>
    res.status(200).json({ status, err, result }),
  controllerMsg: (msg = "", err = "", data = []) => {
    return { data, msg: msg, error: err };
  },
  encode: password => bcrypt.hashSync(password, 10),
  comparePass: (plain, hash) => bcrypt.compareSync(plain, hash),
  token: payload =>
    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "12h" })
  // setRedis: async (id, value) =>
  //   await Redis.set(id.toString(), JSON.stringify(value)),
  // getRedis: async id => JSON.parse(await Redis.get(id.toString())),
  // dropRedis: async id => await Redis.del(id.toString())
};

// {
// 	"status": 200,
// 	"err": "",
// 	"result": {
// 		"user": null,
// 		"msg": "no user"
// 	}
// }

// {
// 	"status": 500,
// 	"err": "Internal Server Errro",
// 	"result": {}
// }
