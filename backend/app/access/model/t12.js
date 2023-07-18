const mongoose = require("mongoose");
const { Schema } = mongoose;

const t12Schema = new Schema(
  {
    c1: { type: Schema.Types.ObjectId, ref: "t1" },
    c2: { type: String, maxlength: 32 },
    c3: { type: String, maxlength: 32 },
    c4: { type: String, maxlength: 32 },
    c5: { type: String, maxlength: 32 },
    c6: { type: String, maxlength: 32 },
    c7: { type: String, maxlength: 32 },
    df: { type: Boolean, default: false },
    cb: { type: Schema.Types.ObjectId, ref: "t0" },
    ud: { type: Schema.Types.ObjectId, ref: "t0" }
  },
  {
    timestamps: true
  }
);

const t12 = mongoose.model("t12", t12Schema);

const getProfile = async id => {
  try {
    let data = await t12.findOne({ c1: id }).populate({
      path: "c1",
      select: "c4",
      populate: {
        path: "c4",
        model: "t2",
        select: "c1"
      }
    });
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

const addProfile = async body => {
  try {
    body.c1 = body.user._id;
    delete body.user;
    delete body.access;
    let data = await new t12(body).save();
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

module.exports = { getProfile, addProfile };
