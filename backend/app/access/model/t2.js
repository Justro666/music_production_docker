const mongoose = require("mongoose");
const { Schema } = mongoose;

const t2Schema = new Schema(
  {
    c1: { type: String, maxlength: 16 },
    c2: { type: Schema.Types.ObjectId, ref: "t1" },
    c3: { type: Schema.Types.ObjectId, ref: "t6" },
    c4: [{ type: Schema.Types.ObjectId, ref: "t3" }],
    df: { type: Boolean, default: false },
    cb: { type: Schema.Types.ObjectId, ref: "t0" },
    ud: { type: Schema.Types.ObjectId, ref: "t0" }
  },
  {
    timestamps: true
  }
);

const t2 = mongoose.model("t2", t2Schema);

const getArole = async roleName => {
  try {
    let role = await t2.findOne({ c1: roleName, df: false });
    return role;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

const getRolesByCataNOwner = async (ownerId, catId) => {
  try {
    let data = await t2
      .find({ c2: ownerId, c3: catId })
      .populate("c4", "c1 c3")
      .select("c1 c4");
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

const createRoles = async datas => {
  try {
    let data = await t2.insertMany(datas);
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

const updatePermissionByCat = async (catId, roleId, permissions) => {
  try {
    console.log({ permissions });
    let data = await t2.findOneAndUpdate(
      { c3: catId, _id: roleId },
      { c4: permissions }
    );
    return data;
  } catch (error) {
    return { error: "Model Error" };
  }
};

module.exports = {
  getArole,
  getRolesByCataNOwner,
  createRoles,
  updatePermissionByCat
};
