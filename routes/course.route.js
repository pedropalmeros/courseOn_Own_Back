const { Router } = require('express');
const { check }  = require('express-validator');

const { validateFields }      = require('../middlewares/validateFields');
const { validateJWT }         = require('../middlewares/validateJWT');

const { getAllCourses }     = require('../controllers/course.controller');
const { createCourse }      = require('../controllers/course.controller');
const { getCourseById }     = require('../controllers/course.controller');
const { deleteCourseById }  = require('../controllers/course.controller');

const { courseExistsById } = require('../helpers/dataBaseValidators');
const { isAuthorRequest }  = require('../helpers/dataBaseValidators');
const { zeroStudents }     = require('../helpers/dataBaseValidators');


const router = Router();

// GET ALL COURSES
router.get('/',getAllCourses)


// GET COURSE BY ID
// TODO: ANYONE WITH A VALID TOKEN CAN REQUEST
router.get('/:courseId',[
    check('courseId','Id is not valid').isMongoId(),
    check('courseId').custom(courseExistsById),
    validateFields
    ],
    getCourseById),

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
router.put('/',(req,res)=>{
    res.json({
        "msg":"UPDATE A COURSE - CONTROLLER"
    })
})


// POST DELETE A CREATED COUTSE
// ONLY THE AUTHOR CAN MODIFY THE COURSE
router.delete('/:courseId',[
    validateJWT,
    check('courseId','Id is not valid').isMongoId(),
    check('courseId').custom(courseExistsById),
    check('courseId').custom(isAuthorRequest),
    check('courseId').custom(zeroStudents),
    validateFields
],deleteCourseById),

module.exports = router; 

