const mongoose = require("mongoose");
const { Schema } = mongoose;

const t16Schema = new Schema(
  {
    c1: { type: String, maxlength: 128 },
    c2: { type: String, maxlength: 256 },
    c3: { type: String, maxlength: 256 },
    df: { type: Boolean, default: false },
    cb: { type: Schema.Types.ObjectId, ref: "t0" },
    ud: { type: Schema.Types.ObjectId, ref: "t0" }
  },
  {
    timestamps: true
  }
);

const t16 = mongoose.model("t16", t16Schema);

module.exports = t16;
