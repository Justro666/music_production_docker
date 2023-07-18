const mongoose = require("mongoose");
const { Schema } = mongoose;

const t5Schema = new Schema(
  {
    c1: { type: String, maxlength: 32 },
    df: { type: Boolean, default: false },
    cb: { type: Schema.Types.ObjectId, ref: "t0" },
    ud: { type: Schema.Types.ObjectId, ref: "t0" }
  },
  {
    timestamps: true
  }
);

const t5 = mongoose.model("t5", t5Schema);

module.exports = t5;
