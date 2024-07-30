const Joi = require('joi');

const bvnVerification = {
  body: Joi.object().keys({
    bvn: Joi.string().required(),
    dob: Joi.string().required(),
    mother_maiden_name: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    place_of_birth: Joi.string().required(),
  }),
};

module.exports = { bvnVerification };
