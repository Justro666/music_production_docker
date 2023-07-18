const mongoose = require("mongoose");
const { Schema } = mongoose;

const t10Schema = new Schema(
  {
    c1: { type: String, maxlength: 128 },
    c2: { type: String, maxlength: 256 },
    c3: { type: String, maxlength: 256 },
    c4: { type: Schema.Types.ObjectId, ref: "t1" },
    df: { type: Boolean, default: false },
    cb: { type: Schema.Types.ObjectId, ref: "t0" },
    ud: { type: Schema.Types.ObjectId, ref: "t0" }
  },
  {
    timestamps: true
  }
);

const t10 = mongoose.model("t10", t10Schema);

const addArt = async (body, filePath, userId) => {
  try {
    body.c3 = filePath;
    body.c4 = userId;
    const data = await new t10(body).save();
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

const allArt = async id => {
  try {
    const data = await t10.find({ c4: id, df: false }).sort({ _id: -1 });
    return data;
  } catch (error) {
    console.log(error);
    return { error: "M Server Error" };
  }
};

const artById = async id => {
  try {
    let data = await t10.findById(id).select("c3 c1");
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

const deleteArtbyId = async artId => {
  try {
    await t10.findByIdAndUpdate(artId, { df: true });
    return "Art Deleted";
  } catch (error) {
    return { error: "M Server Error" };
  }
};
module.exports = { addArt, allArt, artById, deleteArtbyId };
