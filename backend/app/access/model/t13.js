const mongoose = require("mongoose");
const { Schema } = mongoose;

const t13Schema = new Schema(
  {
    c1: { type: Schema.Types.ObjectId, ref: "t12" },
    c2: { type: String, maxlength: 1024 },
    c3: { type: Schema.Types.ObjectId, ref: "t1" },
    df: { type: Boolean, default: false },
    cb: { type: Schema.Types.ObjectId, ref: "t0" },
    ud: { type: Schema.Types.ObjectId, ref: "t0" }
  },
  {
    timestamps: true
  }
);

const t13 = mongoose.model("t13", t13Schema);

module.exports = t13;
