const mongoose = require("mongoose");
const { Schema } = mongoose;

const t7Schema = new Schema(
  {
    c1: { type: Schema.Types.ObjectId, ref: "t6" },
    c2: { type: Schema.Types.ObjectId, ref: "t1" },
    df: { type: Boolean, default: false },
    cb: { type: Schema.Types.ObjectId, ref: "t0" },
    ud: { type: Schema.Types.ObjectId, ref: "t0" }
  },
  {
    timestamps: true
  }
);

const t7 = mongoose.model("t7", t7Schema);

const ownerCata = async id => {
  try {
    let data = await t7.find({ c2: id, df: false }).select("c1");
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

const ownerCataData = async id => {
  try {
    let data = await t7
      .find({ c2: id, df: false })
      .populate("c1", "c1")
      .select("c1");
    return data;
  } catch (error) {
    console.log(error);
    return { error: "M Server Error" };
  }
};

const ownerCataDatas = async id => {
  try {
    let data = await t7
      .find({ c2: id, df: false })
      .populate("c1")
      .select("c1")
      .sort({ _id: -1 });
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

const catalogOwner = async catid => {
  try {
    let data = await t7
      .findOne({ c1: catid })
      .populate("c2", "c1")
      .select("c2");
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

const addOwnerCata = async (catId, id) => {
  try {
    let data = await new t7({ c1: catId, c2: id }).save();
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

module.exports = {
  ownerCata,
  ownerCataData,
  catalogOwner,
  addOwnerCata,
  ownerCataDatas
};
