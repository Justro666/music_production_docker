const mongoose = require("mongoose");
const { Schema } = mongoose;

const t17Schema = new Schema(
  {
    c1: { type: String, maxlength: 32 },
    c2: { type: String, maxlength: 32 },
    c3: { type: Schema.Types.ObjectId, ref: "t5" },
    df: { type: Boolean, default: false },
    cb: { type: Schema.Types.ObjectId, ref: "t0" },
    ud: { type: Schema.Types.ObjectId, ref: "t0" }
  },
  {
    timestamps: true
  }
);

const t17 = mongoose.model("t17", t17Schema);

module.exports = t17;
