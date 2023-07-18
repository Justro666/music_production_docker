const mongoose = require("mongoose");
const { Schema } = mongoose;

const t9Schema = new Schema(
  {
    c1: { type: String, maxlength: 128 },
    c2: { type: String, maxlength: 256 },
    c3: [{ type: String, maxlength: 256 }],
    c4: { type: Boolean, default: false },
    c5: { type: Number, min: 0, max: 3, default: 3 },
    c6: { type: Schema.Types.Decimal128, default: 3.0 },
    c7: { type: String, maxlength: 32 },
    c8: { type: Schema.Types.ObjectId, ref: "t1" },
    df: { type: Boolean, default: false },
    cb: { type: Schema.Types.ObjectId, ref: "t0" },
    ud: { type: Schema.Types.ObjectId, ref: "t0" }
  },
  {
    timestamps: true
  }
);

const t9 = mongoose.model("t9", t9Schema);

const addMusic = async (body, music, doc, userId) => {
  try {
    const data = await new t9({
      c1: body.name,
      c2: music,
      c3: doc,
      c8: userId
    }).save();
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

const getAllSongs = async userId => {
  try {
    const data = await t9.find({ c8: userId, df: false }).sort({ _id: -1 });
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

const updateSongStatus = async (songId, status) => {
  try {
    let data = await t9.findByIdAndUpdate(songId, { c5: status });
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

const getSongbyId = async songId => {
  try {
    let data = await t9.findById(songId).select("c2 c1 c3");
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

const deleteSongbyId = async songId => {
  try {
    await t9.findByIdAndUpdate(songId, { df: true });
    return "Song Deleted";
  } catch (error) {
    return { error: "M Server Error" };
  }
};

module.exports = {
  addMusic,
  getAllSongs,
  updateSongStatus,
  getSongbyId,
  deleteSongbyId
};
