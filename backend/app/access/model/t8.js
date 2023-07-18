const mongoose = require("mongoose");
const { Schema } = mongoose;

const t8Schema = new Schema(
  {
    c1: { type: Schema.Types.ObjectId, ref: "t6" },
    c2: [{ type: Schema.Types.ObjectId, ref: "t1" }],
    df: { type: Boolean, default: false },
    cb: { type: Schema.Types.ObjectId, ref: "t0" },
    ud: { type: Schema.Types.ObjectId, ref: "t0" }
  },
  {
    timestamps: true
  }
);

const t8 = mongoose.model("t8", t8Schema);

const addUserCata = async id => {
  try {
    await new t8({ c1: id }).save();
    return "Successful";
  } catch (error) {
    return { error: "M Server Error" };
  }
};

const userCata = async id => {
  try {
    let data = await t8.find({ c2: { $in: id }, df: false }).select("c1");
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

const userCataData = async id => {
  try {
    let data = await t8
      .find({ c2: { $in: id }, df: false })
      .populate("c1", "c1")
      .select("c1 -_id");
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

const userCataDatas = async id => {
  try {
    let data = await t8
      .find({ c2: { $in: id }, df: false })
      .populate("c1")
      .select("c1 -_id")
      .sort({ _id: -1 });
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

const updateUserCat = async (catId, userId) => {
  try {
    await t8.findOneAndUpdate(
      { c1: catId },
      { $push: { c2: userId } },
      { new: true }
    );
    return "Successful";
  } catch (error) {
    return { error: "M Server Error" };
  }
};

const catalogMember = async catId => {
  try {
    let data = await t8
      .findOne({
        c1: catId
      })
      .populate({
        path: "c2",
        select: "c1 c4",
        populate: {
          path: "c4",
          select: "c1"
        }
      });
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

module.exports = {
  addUserCata,
  userCata,
  userCataData,
  updateUserCat,
  catalogMember,
  userCataDatas
};
