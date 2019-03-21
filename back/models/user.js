const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require('joi');

const UserSchema = new Schema({
  user: { type: String, required: true },
  password: { type: String, required: true }
});

function validate(req) {
  const schema = {
    user: Joi.string()
      .min(5)
      .required(),
    password: Joi.string()
      .min(5)
      .required()
  };
  return Joi.validate(req, schema);
}

// export the new Schema so we could modify it using Node.js
module.exports = {
  User: mongoose.model('User', UserSchema),
  validate
};
