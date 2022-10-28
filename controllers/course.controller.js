const { request, response } = require('express');
const User = require('../models/user');
const Course = require('../models/course');
const { uploadFileProcess } = require('../helpers/uploadValidateFields');
const getAllCourses = async (req, res) => {
  const allCourses = await Course.find().populate('user');
  res.json({
    msg: 'All courses requested',
    allCourses,
  });
};

const getCourseById = async (req, res) => {
  const { courseId } = req.params;
  const courseById = await Course.findById(courseId).populate('user');

  return res.status(200).json({
    status: true,
    courseById,
  });
};

// const uploadCourseImages = (req = request, res = response) =>{
//  const courseId = req.params._id
//  const
// }

const createCourse = async (req = request, res = response) => {
  console.log('body', req);
  const title = req.body.title.toUpperCase();

  const imgBanner = { file: req.files.Image[0] };
  const imgMinature = { file: req.files.Image[1] };
  const courseDB = await Course.findOne({ title });
  if (courseDB !== null) {
    return res.status(400).json({
      success: false,
      msg: `The course ${title} already exists`,
    });
  }

  const authorId = req.user._id.toString();
  const authorUser = await User.findById(authorId);
  authorUser.coursesTeach = [title, ...authorUser.coursesTeach];

  const authorUpdate = await User.findByIdAndUpdate(authorId, {
    coursesTeach: authorUser.coursesTeach,
  });

  const imgBannerUpload = await uploadFileProcess(imgBanner, undefined, 'imgs');
  const imgMinatureUpload = await uploadFileProcess(
    imgMinature,
    undefined,
    'imgs'
  );
  console.log('imgBanner', imgBannerUpload);
  console.log('imgMinature', imgMinatureUpload);

  const courseData = {
    title,
    imgBanner: imgBannerUpload,
    imgMinature: imgMinatureUpload,
    user: req.user._id,
  };
  const newCourse = new Course(courseData);
  await newCourse.save();
  res.status(201).json({
    success: true,
    newCourse,
  });
};

const deleteCourseById = async (req = request, res = response) => {
  const { courseId } = req.params;
  const course = await Course.findByIdAndDelete(courseId);
  res.status(200).json({
    success: true,
    msg: 'Course deleted',
    course,
  });
};

module.exports = {
  getAllCourses,
  createCourse,
  getCourseById,
  deleteCourseById,
};
