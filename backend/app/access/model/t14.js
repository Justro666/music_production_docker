const mongoose = require("mongoose");
const { Schema } = mongoose;

const t14Schema = new Schema(
  {
    c1: { type: Schema.Types.ObjectId, ref: "t9" },
    df: { type: Boolean, default: false },
    cb: { type: Schema.Types.ObjectId, ref: "t0" },
    ud: { type: Schema.Types.ObjectId, ref: "t0" }
  },
  {
    timestamps: true
  }
);

const t14 = mongoose.model("t14", t14Schema);

module.exports = t14;
