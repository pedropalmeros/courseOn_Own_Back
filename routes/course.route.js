const { Router } = require('express');
const { check }  = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const { validateJWT }    = require('../middlewares/validateJWT');

const { getAllCourses } = require('../controllers/course.controller');
const { createCourse }  = require('../controllers/course.controller');


const router = Router();

// GET ALL COURSES
router.get('/',getAllCourses)


// GET COURSE BY ID
// TODO: ANYONE WITH A VALID TOKEN CAN REQUEST
router.get('/:courseId',(req,res)=>{
    res.json({
        "msg":"GET CATEGORY BY ID - CONTROLLER"
    })
})

// POST CREATE A NEW COURSE
// TODO ANYONE WITH A VALID TOKEN CAN CREATE A NEW COURSE
router.post('/',[
    validateJWT,
    check('title','TITLE is mandatory').not().isEmpty(),
    validateFields
    ],
    createCourse
)


// POST EDIT A CREATED COUTSE
// ONLY THE AUTHOR CAN MODIFY THE COURSE
router.post('/',(req,res)=>{
    res.json({
        "msg":"UPDATE A COURSE - CONTROLLER"
    })
})


// POST EDIT A CREATED COUTSE
// ONLY THE AUTHOR CAN MODIFY THE COURSE
router.delete('/',(req,res)=>{
    res.json({
        "msg":"DELETE A COURSE - CONTROLLER"
    })
})

module.exports = router; 

