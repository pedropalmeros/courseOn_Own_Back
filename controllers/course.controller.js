const {request, response} = require('express'); 
const User   = require('../models/user');
const Course = require('../models/course'); 

const getAllCourses = async(req, res) =>{
    const allCourses = await Course.find();
    res.json({
        msg: 'All courses requested',
        allCourses
    })
}

const createCourse = async (req = request, res = response)=>{
    const title = req.body.title.toUpperCase();

    const courseDB  = await Course.findOne({title});

    if( courseDB !== null ){
        console.log("The course already exists")
        return res.status(400).json({
            success: false,
            msg: `The course ${title} already exists`
        });
    }

    const courseData = {
        title,
        user: req.user._id
    }

    console.log(courseData);

    const newCourse = new Course(courseData);

    await newCourse.save();

    res.status(201).json({
        success: true,
        newCourse
    });

}





module.exports = {
    getAllCourses,
    createCourse
}