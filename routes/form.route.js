const express = require('express');
const { body } = require('express-validator');

const {
  createForm,
  getFormById,
  getForm,
} = require('../controllers/form.controller');

const router = express.Router();

router.get('/:id', getFormById);

router.get('/', getForm);
router.post('/', async (request, response) => {
  const { body, formId } = request;
  try {
    const form = await createForm(body, formId);
    response.status(201);
    response.json({
      succes: true,
      data: {
        form,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      succes: false,
      message: error.message,
    });
  }
});

module.exports = router;
