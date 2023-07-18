const mongoose = require("mongoose");
const { Schema } = mongoose;

const t15Schema = new Schema(
  {
    c1: { type: String, maxlength: 128 },
    c2: { type: String, maxlength: 2048 },
    c3: { type: Schema.Types.ObjectId, ref: "t12" },
    c4: { type: Number, min: 0, max: 1 },
    df: { type: Boolean, default: false },
    cb: { type: Schema.Types.ObjectId, ref: "t0" },
    ud: { type: Schema.Types.ObjectId, ref: "t0" }
  },
  {
    timestamps: true
  }
);

const t15 = mongoose.model("t15", t15Schema);

module.exports = t15;
