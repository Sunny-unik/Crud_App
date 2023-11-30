const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "userProfiles");
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const uniqueName = file.fieldname.slice(0, 3) + "-" + Date.now(); // pro-234763458969876.jpg
    console.log("Uploading " + uniqueName + extension);
    cb(null, uniqueName + extension);
  }
});

const multerOptions = {
  storage: storage,
  fileFilter: function (req, file, callback) {
    const extension = path.extname(file.originalname);
    const fieldName = file.fieldname;
    if (fieldName == "profile") {
      if (extension !== ".png" && extension !== ".jpg" && extension !== ".jpeg") {
        return callback(
          new Error(`Only png, jpg, jpeg extension's images are allowed for profile`)
        );
      }
      callback(null, true);
    }
  }
};

const upload = multer(multerOptions).fields([{ name: "profile", maxCount: 1 }]);
module.exports = upload;
