const mongoose = require("mongoose");
const { Schema } = mongoose;

const t0Schema = new Schema(
  {
    c1: { type: String, maxlength: 128 },
    df: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

const t0 = mongoose.model("t0", t0Schema);



module.exports = {};
