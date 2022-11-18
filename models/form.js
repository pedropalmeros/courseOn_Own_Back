const { Schema, model } = require('mongoose');

const FormSchema = Schema({
  questions: {
    type: [
      {
        title: {
          type: String,
        },

        answers: {
          type: [
            {
              text: {
                type: String,
              },
              isCorrect: {
                type: Boolean,
              },
            },
          ],
        },
      },
    ],
  },
  // questions: {
  //   type: [
  //     {
  //       title: {
  //         type: String,
  //       },
  //     },
  //   ],
  // },
  // answers: {
  //   type: [
  //     {
  //       text: {
  //         type: String,
  //       },
  //       isCorrect: {
  //         type: Boolean,
  //       },
  //     },
  //   ],
  // },
});

FormSchema.methods.toJSON = function () {
  const { _id, ...formData } = this.toObject();
  formData.id = _id;
  return formData;
};

module.exports = model('forms', FormSchema);
