const { Router } = require('express'); 
const { check } = require('express-validator');

const { getAllUsers }       = require('../controllers/user.controller');
const { createNewUser }     = require('../controllers/user.controller');
const { updateUserById }    = require('../controllers/user.controller'); 
const { deleteUserById }    = require('../controllers/user.controller');

const { validateFields } = require ('../middlewares/validateFields');
const { validateJWT }    = require ('../middlewares/validateJWT');

const { emailExists }    = require ('../helpers/dataBaseValidators'); 
const { userExistsById } = require ('../helpers/dataBaseValidators');


const router = Router();

router.get('/', getAllUsers)

// Create a new user 
router.post('/',[
    check('email','Email is not valid').isEmail(),
    check('name','Name is mandatory').not().isEmpty(),
    check('password','Password is mandatory and it should be greater than six characters').isLength({min: 6}),
    check('email').custom(emailExists),
    validateFields
],createNewUser)

// Update User
router.put('/:userId',[
    //validateJWT,
    check('userId','Id is not valid').isMongoId(),
    check('userId').custom(userExistsById),
    validateFields
],updateUserById);


// Delete user by Id
router.delete('/:userId',[
    //validateJWT,
    check('userId','Id is not valid').isMongoId(),
    check('userId').custom(userExistsById),
    validateFields
],deleteUserById);

router.patch('/',updateUserById)

module.exports = router;