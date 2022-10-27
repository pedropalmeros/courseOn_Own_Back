const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const { validateUploadReq } = require('../middlewares/validateFile')

const { uploadFile }  = require('../controllers/uploads.controller');
const { updateImage } = require('../controllers/uploads.controller');
const {updateImageCloudinary } = require('../controllers/uploads.controller')
const { getImageByCategoryId } = require('../controllers/uploads.controller');

const { isCollectionValid } = require('../helpers/dataBaseValidators');

const router = Router();


// Upload a new file
router.post('/',validateUploadReq,uploadFile);

router.put('/:collection/:id',[
    check('id','Invalid Id').isMongoId(),
    validateUploadReq,
    check('collection').custom(c => isCollectionValid(c,['users','courses'])),
    validateFields
],updateImageCloudinary);

// GET a image
router.get('/:collection/:id',[
    check('id','Invalid Id').isMongoId(),
    check('collection').custom(c => isCollectionValid(c,['users','courses'])),
    validateFields
],getImageByCategoryId)


module.exports = router;