const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   const uploadDir = path.join(__dirname, '../uploads');
  //   if (!fs.existsSync(uploadDir)) {
  //     fs.mkdirSync(uploadDir);
  //   }
  //   cb(null, uploadDir);
  // },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // set uploaded file name
  }
});

const upload = multer({ storage: storage });

module.exports = {
  upload,
}