const { response, request } = require('express');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { uploadFileProcess } = require('../helpers/uploadValidateFields');
const { validateUploadReq } = require('../middlewares/validateFile');

const path = require('path');
const Form = require('../models/form');

const getForm = async (request, response) => {
  const getAllForm = await Form.find();
  response.json({
    msg: 'All Forms request',
    getAllForm,
  });
};

const getFormById = async (req, res) => {
  const { id } = req.params;

  const formById = await Form.findById(id);

  return res.status(200).json({
    status: true,
    formById,
  });
};

const createForm = async (formData) => {
  console.log('formData', formData);
  const form = await Form.create(formData);
  console.log('form', form);
  return form;
};

module.exports = { createForm, getFormById, getForm };
