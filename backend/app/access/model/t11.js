const mongoose = require("mongoose");
const { Schema } = mongoose;

const t11Schema = new Schema(
  {
    c1: { type: String, maxlength: 32 },
    c2: { type: String, maxlength: 32 },
    c3: { type: String, maxlength: 256 },
    c4: { type: String, maxlength: 128 },
    c5: { type: String, maxlength: 128 },
    c6: { type: Schema.Types.ObjectId, ref: "t10" },
    c7: { type: Schema.Types.ObjectId, ref: "t9" },
    c8: { type: String, maxlength: 128 },
    c9: { type: String, maxlength: 4 },
    c10: { type: Schema.Types.Decimal128 },
    c11: { type: String, maxlength: 128 },
    c12: { type: String, maxlength: 128 },
    c13: { type: String, maxlength: 128 },
    c14: { type: String, maxlength: 128 },
    c15: { type: Number, min: 0, max: 4 },
    c16: { type: String, maxlength: 128 },
    c17: { type: String, maxlength: 128 },
    c18: { type: String, maxlength: 128 },
    c19: { type: String, maxlength: 128 },
    c20: { type: Schema.Types.ObjectId, ref: "t1" },
    c21: { type: Number, min: 0, max: 2 },
    c22: { type: Schema.Types.ObjectId, ref: "t6" },
    df: { type: Boolean, default: false },
    cb: { type: Schema.Types.ObjectId, ref: "t0" },
    ud: { type: Schema.Types.ObjectId, ref: "t0" }
  },
  {
    timestamps: true
  }
);

const t11 = mongoose.model("t11", t11Schema);

const allProjectbyUser = async (id, status) => {
  try {
    if (status == 2) {
      const data = await t11
        .find({ c20: id, c21: status, df: false })
        .sort({ _id: -1 });
      return data;
    } else {
      const data = await t11
        .find({ c20: id, df: false })
        .populate("c22", "c1")
        .sort({ _id: -1 });
      return data;
    }
  } catch (error) {
    return { error: "M Server Error" };
  }
};

const addProject = async (body, id) => {
  try {
    body.c1 = body.c8;
    body.c20 = id;
    const data = await new t11(body).save();
    // let data;
    // data.c1 = data1.c1;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return { error: "M Server Error" };
  }
};

const projectDatabyMusic = async id => {
  try {
    let data = await t11.find({ c7: id }).populate("c6", "c3");
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

const updateProjectStatus = async (id, status) => {
  try {
    let data = await t11.findByIdAndUpdate(id, { c21: status });
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

const updateProjectImage = async (id, image) => {
  try {
    let data = await t11.findByIdAndUpdate(id, { c6: image });
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

const projDataByCat = async id => {
  try {
    let data = t11
      .find({ c22: id, c21: 2, df: false })
      .populate("c6", "c1 c3")
      .select("c2 c3 c4 c5 c6 c8 c10 c9 c11");
    return data;
  } catch (error) {
    return { error: "M Server Error" };
  }
};

module.exports = {
  allProjectbyUser,
  addProject,
  projectDatabyMusic,
  updateProjectStatus,
  updateProjectImage,
  projDataByCat
};
