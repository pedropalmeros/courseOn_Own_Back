const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'Error: Name is mandatory'],
  },
  familyName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: [true, 'Error: EMAIL is mandatory'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Error: PASSWORD is mandatory'],
  },
  img: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
  coursesLearn: [
    {
      test: {
        default: false,
      },
    },
  ],
  coursesTeach: [
    {
      type: String,
    },
  ],
  preferenceTags: [
    {
      type: String,
    },
  ],
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...userData } = this.toObject();
  userData.id = _id;
  return userData;
};

module.exports = model('User', UserSchema);
