const mongoose = require("mongoose");
const { Schema } = mongoose;

const t18Schema = new Schema(
  {
    c1: { type: Schema.Types.ObjectId, ref: "t12" },
    c2: { type: String, maxlength: 1024 },
    c3: { type: Boolean, default: false },
    df: { type: Boolean, default: false },
    cb: { type: Schema.Types.ObjectId, ref: "t0" },
    ud: { type: Schema.Types.ObjectId, ref: "t0" }
  },
  {
    timestamps: true
  }
);

const t18 = mongoose.model("t18", t18Schema);

module.exports = t18;
