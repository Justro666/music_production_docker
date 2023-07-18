const mongoose = require("mongoose");
const { Schema } = mongoose;

const t19Schema = new Schema(
  {
    c1: { type: Schema.Types.ObjectId, ref: "t1" },
    c2: { type: Schema.Types.ObjectId, ref: "t6" },
    c3: { type: Number, min: 0, max: 2, default: 0 },
    df: { type: Boolean, default: false },
    cb: { type: Schema.Types.ObjectId, ref: "t0" },
    ud: { type: Schema.Types.ObjectId, ref: "t0" }
  },
  {
    timestamps: true
  }
);

const t19 = mongoose.model("t19", t19Schema);

const reqCata = async body => {
  try {
    let data = await new t19(body).save();
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};
//for check user has join in login page
const getUserCata = async id => {
  try {
    let data = await t19.find({ c1: id, c3: 0, df: 0 });
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};
//for team member request list
const userRequestByCatId = async id => {
  try {
    let data = await t19.find({ c2: id, c3: 0, df: 0 }).select("c1 c2");
    console.log(data);
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

//update the user request to catalog, approve or declined
const updateStatus = async (id, status) => {
  try {
    await t19.findByIdAndUpdate(id, { c3: status });
    return "Request Successful";
  } catch (error) {
    return { error: "M Server Error" };
  }
};

module.exports = { reqCata, getUserCata, userRequestByCatId, updateStatus };
