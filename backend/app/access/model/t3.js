const mongoose = require("mongoose");
const { Schema } = mongoose;

const t3Schema = new Schema(
  {
    c1: { type: String, maxlength: 128 },
    c2: [{ type: Schema.Types.ObjectId, ref: "m_pages" }],
    c3: {
      type: Number,
      min: 0,
      max: 2
    },
    df: { type: Boolean, default: false },
    cb: { type: Schema.Types.ObjectId, ref: "t0" },
    ud: { type: Schema.Types.ObjectId, ref: "t0" }
  },
  {
    timestamps: true
  }
);

const t3 = mongoose.model("t3", t3Schema);

const getPermissionsData = async () => {
  try {
    let data = await t3.find().select("c1 c3");
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

module.exports = { getPermissionsData, t3 };
