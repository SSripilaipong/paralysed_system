const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require('joi');

const GroupSchema = new Schema({
  name: {
    type: String,
    minLength: 5,
    required: true
  },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

function validate(req) {
  const schema = {
    name: Joi.string()
      .min(5)
      .required(),
    user: Joi.string().required()
  };
  return Joi.validate(req, schema);
}

module.exports = { Group: mongoose.model('Group', GroupSchema), validate };
