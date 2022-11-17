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
  const { formId } = req.params;
  const formById = await Course.findById(formId);

  return res.status(200).json({
    status: true,
    formById,
  });
};

const createForm = (formData, formId) => {
  formData.formId = formId;
  const form = Form.create(formData);
  return form;
};

module.exports = { createForm, getFormById };
