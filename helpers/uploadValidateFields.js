const { Console } = require('console');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFileProcess = (
  files,
  allowedExtensions = ['png', 'jpg', 'jpeg', 'gif', 'mp4', 'pdf'],
  addressFile = ''
) => {
  return new Promise((resolve, reject) => {
    const file2process = files;
    //console.log('------------- FILE2PROCESSS ---------')
    console.log(file2process);

    const splittedFileName = file2process.name.split('.');
    const extension = splittedFileName[splittedFileName.length - 1];

    //console.log('----------- EXTENSION ----------');
    console.log(extension);

    // Validate the extension
    if (!allowedExtensions.includes(extension)) {
      return reject(
        `Invalid extension only the next extensions are allowed: ${allowedExtensions}`
      );
    }

    const tempName = uuidv4() + '.' + extension;
    const uploadPath = path.join(
      __dirname,
      '../uploads/',
      addressFile,
      tempName
    );

    resolve(tempName);

    //file2process.mv(uploadPath, (err) => {
    //  if (err) {
    //    reject(err);
    //  }

    //  resolve(tempName);
    //});
  });
};

module.exports = {
  uploadFileProcess,
};
