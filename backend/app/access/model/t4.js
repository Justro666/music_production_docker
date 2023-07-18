const mongoose = require("mongoose");
const { Schema } = mongoose;

const t4Schema = new Schema(
  {
    c1: { type: String, maxlength: 32 },
    c2: { type: Boolean, default: true },
    df: { type: Boolean, default: false },
    cb: { type: Schema.Types.ObjectId, ref: "t0" },
    ud: { type: Schema.Types.ObjectId, ref: "t0" }
  },
  {
    timestamps: true
  }
);

const t4 = mongoose.model("t4", t4Schema);

module.exports = { t4 };
