const { Schema, model } = require('mongoose');

const CourseSchema = Schema({
  title: {
    type: String,
    required: [true, 'Error: TITLE is mandatory'],
    unique: true,
  },
  description: {
    type: String,
  },
  state: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  enrolledStudents: {
    type: Number,
    default: 0,
  },
  imgBanner: {
    type: String,
  },
  imgMinature: {
    type: String,
  },
});

CourseSchema.methods.toJSON = function () {
  const { _id, ...courseData } = this.toObject();
  courseData.id = _id;
  return courseData;
};

module.exports = model('Course', CourseSchema);
