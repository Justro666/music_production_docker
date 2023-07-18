const mongoose = require("mongoose");
const { Schema } = mongoose;

const tSchema = new Schema(
  {
    df: { type: Boolean, default: false },
    cb: { type: Schema.Types.ObjectId, ref: "t0" },
    ud: { type: Schema.Types.ObjectId, ref: "t0" }
  },
  {
    timestamps: true
  }
);

const t = mongoose.model("t", tSchema);

module.exports = t;
