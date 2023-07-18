const Joi = require('joi');

module.exports = {
  Schema: {
    addAdmin: Joi.object({
      name: Joi.string().required().max(15),
      mail: Joi.string().required().max(30).email(),
      password: Joi.string().required().min(8).max(20),
    }),
    idParam: Joi.object({
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    createAccount: Joi.object({
      c1: Joi.string().required().max(15),
      c2: Joi.string().min(5).max(30).required().email(),
      c3: Joi.string().min(8).required(),
      c5: Joi.string().required().max(15),
    }),
    loginUser: Joi.object({
      c2: Joi.string().min(5).max(30).required().email(),
      c3: Joi.string().min(8).required(),
    }),
    musicUploadTitle: Joi.object({
      name: Joi.string().required().min(3).max(40),
      user: Joi.allow(),
      access: Joi.allow(),
    }),
    photoBody: Joi.object({
      c1: Joi.string().required().min(4).max(20),
      c2: Joi.string().required().min(5).max(100),
      user: Joi.allow(),
      access: Joi.allow(),
    }),
    projectData: Joi.object({
      c2: Joi.string().required().min(4).max(30),
      c3: Joi.string().required().min(4).max(30),
      c4: Joi.string().required().min(4).max(30),
      c5: Joi.string().required().min(4).max(30),
      c6: Joi.string(),
      c7: Joi.string(),
      c8: Joi.string().required().min(4).max(40),
      c9: Joi.string().required().min(4).max(4),
      c10: Joi.number().required(),
      c11: Joi.string().required().min(4).max(30),
      c12: Joi.string(),
      c13: Joi.string(),
      c14: Joi.string(),
      c15: Joi.number(),
      c16: Joi.string(),
      c17: Joi.string(),
      c18: Joi.string(),
      c19: Joi.string(),
      c21: Joi.number(),
      c22: Joi.string(),
      user: Joi.allow(),
      access: Joi.allow(),
    }),
  },
};
