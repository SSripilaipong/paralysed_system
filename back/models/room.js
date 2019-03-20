const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require('joi');

const RoomSchema = new Schema({
  name: {
    type: String(),
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
    participants: Joi.array.items().required()
  };
  return Joi.validate(req, schema);
}

module.exports = { Room: mongoose.model('Room', RoomSchema), validate };
