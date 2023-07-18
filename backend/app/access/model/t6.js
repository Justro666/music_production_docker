const mongoose = require("mongoose");
const { Schema } = mongoose;

const t6Schema = new Schema(
  {
    c1: { type: String, maxlength: 64 },
    c2: { type: String, maxlength: 256 },
    c3: { type: String, maxlength: 64 },
    c4: { type: String, maxlength: 64 },
    c5: { type: String, maxlength: 64 },
    c6: { type: Number, min: 0, max: 3 },
    c7: { type: Number, min: 0, max: 2 },
    df: { type: Boolean, default: false },
    cb: { type: Schema.Types.ObjectId, ref: "t0" },
    ud: { type: Schema.Types.ObjectId, ref: "t0" }
  },
  {
    timestamps: true
  }
);

const t6 = mongoose.model("t6", t6Schema);

const getAll = async () => {
  try {
    let data = await t6.find({ df: false });
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

const addCatalogIdentity = async body => {
  try {
    let data = await new t6(body).save();
    id = data._id;
    return id;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

module.exports = { getAll, addCatalogIdentity };
