const { request, response } = require('express');
const cloudinary = require('cloudinary').v2;
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

  const title = req.body.title.toUpperCase();
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

  let imgBannerUrl = '';
  let imgMinatureUrl = '';

  

  if(!req.files || Object.keys(req.files).length===0){
    console.log("there are no files attached to the request");
    console.log("Default Images are going to be set for Banner and minature");
  }else{
  const imgBanner =  req.files.Image[0] ;
  const imgMinature = req.files.Image[1] ;

  const uploadBanner = await cloudinary.uploader.upload(imgBanner.tempFilePath);
  imgBannerUrl = uploadBanner.secure_url;

  const uploadMiniature = await cloudinary.uploader.upload(imgMinature.tempFilePath);  
  imgMinatureUrl = uploadMiniature.secure_url;
  }
  
  const courseData = {
    title,
    imgBanner: imgBannerUrl,
    imgMinature: imgMinatureUrl,
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
