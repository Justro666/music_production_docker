const mongoose = require("mongoose");
const { Schema } = mongoose;

const t1Schema = new Schema(
  {
    c1: { type: String, maxlength: 32 },
    c2: { type: String, maxlength: 128 },
    c3: { type: String, maxlength: 128 },
    c4: { type: Schema.Types.ObjectId, ref: "t2" },
    c5: { type: String, maxlength: 128 },
    c6: { type: Boolean },
    df: { type: Boolean, default: false },
    cb: { type: Schema.Types.ObjectId, ref: "t0" },
    ud: { type: Schema.Types.ObjectId, ref: "t0" }
  },
  {
    timestamps: true
  }
);

const t1 = mongoose.model("t1", t1Schema);

const getUser = async email => {
  try {
    const user = await t1
      .findOne({ c2: email, df: false })
      .select("_id c3 c1 c4"); //email : c2
    return user;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

const addUser = async (body, roleId) => {
  // const addUser = await new
  try {
    body.c6 = true;
    const user = await new t1(body).save();
    delete user.c3;
    delete user.c4;
    delete user.c5;
    delete user.df;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.__v;
    return user;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

const inviteUser = async (name, email, roleId, password) => {
  try {
    let data = await new t1({
      c1: name,
      c2: email,
      c3: password,
      c4: roleId,
      c5: false
    }).save();
    let id = data._id;
    return id;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

module.exports = {
  getUser,
  addUser,
  t1,
  inviteUser
};
