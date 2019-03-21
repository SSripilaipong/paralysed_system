const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require('joi');
const timestamps = require('mongoose-timestamp');

const MessageSchema = new Schema({
  groupId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  user: {
    type: String,
    required: true
  }
});

MessageSchema.plugin(timestamps);

function validate(req) {
  const schema = {
    groupId: Joi.required(),
    body: Joi.string().required(),
    userId: Joi.required(),
    user: Joi.string().required()
  };
  return Joi.validate(req, schema);
}

module.exports = {
  Message: mongoose.model('Message', MessageSchema),
  validate
};
