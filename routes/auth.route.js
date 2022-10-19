const { Router } = require('express');
const { check }  = require('express-validator');

const { login }  = require('../controllers/auth.controller');

const { validateFields } = require('../middlewares/validateFields');


const router = Router();

router.post('/login',[
    check('email','Email is invalid').isEmail(),
    check('email','Email is empty').not().isEmpty(),
    check('password','Password is emtpy').not().isEmpty(),
    validateFields
],login);


module.exports = router;
