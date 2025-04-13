import multer, { diskStorage } from "multer";
import randomstring from "randomstring";
import path from "path";

// check image type only accepts
const fileType = (file, cb) => {
  // regular expression
  let allow = /jpeg|jpg|png|gif|mp4|mov|mkv/;
  // match type end point
  const isMatch = allow.test(path.extname(file.originalname).toLowerCase());
  // mime type check to same
  const isMIME = allow.test(file.mimetype);

  //   check to same types
  if (isMIME && isMatch) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// file upload function for image single
export const uploadFile = multer({
  //  storage disk and file detail
  storage: diskStorage({
    destination: (req, file, cb) => {
      // store file folder
      cb(null, "./public/profile");
    },
    // chack file name to randomstring
    filename: (req, file, cb) => {
      let p1 = randomstring.generate(4);
      let p2 = randomstring.generate(4);
      //   change to lower case
      let ext = path.extname(file.originalname).toLowerCase();

      cb(null, file.fieldname + "_" + p1 + p2 + ext);
    },
  }),
  // file limits 2 mb
  limits: {
    fileSize: 1000000 * 10,
  },
  //   file filter in type
  fileFilter: (req, file, cb) => {
    fileType(file, cb);
  },
}).single("profile");

// video file upload 2 limit
export const videoUpload = multer({
  //  storage disk and file detail
  storage: diskStorage({
    destination: (req, file, cb) => {
      // store file folder
      cb(null, "./public/video");
    },
    // chack file name to randomstring
    filename: (req, file, cb) => {
      let p1 = randomstring.generate(8);
      let p2 = randomstring.generate(8);
      // console.log(file);
      //   change to lower case
      let ext = path.extname(file.originalname).toLowerCase();

      cb(null, file.fieldname + "_" + p1 + p2 + ext);
    },
  }),
  //   file filter in type
  fileFilter: (req, file, cb) => {
    fileType(file, cb);
  },
}).array("video", 2);

// multi file upload function for image
export const multiUpload = multer({
  //  storage disk and file detail
  storage: diskStorage({
    destination: (req, file, cb) => {
      // store file folder
      cb(null, "./public/bodyImage");
    },
    // chack file name to randomstring
    filename: (req, file, cb) => {
      //   change to lower case
      cb(null, file.originalname);
    },
  }),
  // file limits 2 mb
  limits: {
    fileSize: 1000000 * 2,
  },
  //   file filter in type
  fileFilter: (req, file, cb) => {
    fileType(file, cb);
  },
}).array("image");
