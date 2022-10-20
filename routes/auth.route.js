const { Router } = require('express');
const { check }  = require('express-validator');

const { login }  = require('../controllers/auth.controller');
const { googleSignIn } = require('../controllers/auth.controller');

const { validateFields } = require('../middlewares/validateFields');

const router = Router();

router.post('/login',[
    check('email','Email is invalid').isEmail(),
    check('email','Email is empty').not().isEmpty(),
    check('password','Password is emtpy').not().isEmpty(),
    validateFields
],login);

router.post('/google',[
    check('id_token','Google token is mandatory').not().isEmpty(),
    validateFields
],googleSignIn);


module.exports = router;
