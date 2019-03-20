const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require('joi');
const timestamps = require('mongoose-timestamp');

const MessageSchema = new Schema({
  GroupId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  timestamps: true
});

MessageSchema.plugin(timestamps);

function validate(req) {
  const schema = {
    RoomId: Joi.required(),
    body: Joi.string().required(),
    author: Joi.required()
  };
  return Joi.validate(req, schema);
}

module.exports = {
  Message: mongoose.model('Message', MessageSchema),
  validate
};
