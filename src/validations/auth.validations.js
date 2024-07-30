const Joi = require("joi");

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const studentLogin = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    school: Joi.string().required(),
  }),
};

const signUp = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
  }),
};

const schoolRegistration = {
  body: Joi.object().keys({
    admin: Joi.object({
      admin_email: Joi.string().required(),
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      admin_phone: Joi.string().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
      admin_address: Joi.string().optional()
    }),
    school: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      address: Joi.string().optional(),
      phone: Joi.string().required()
    }),
  }),
};

const verification = {
  body: Joi.object().keys({
    otp: Joi.string().required(),
    code: Joi.string().uuid().required(),
  }),
};

module.exports = { login, signUp, schoolRegistration, verification,studentLogin };
