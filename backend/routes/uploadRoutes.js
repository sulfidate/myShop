import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
// It is written on top of busboy for maximum efficiency.
// https://www.npmjs.com/package/multer
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/'); // null is for error
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    // test() method executes a search for a match between a regular expression and a specified string. Returns true or false.
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // mimetype is the type of file
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

// upload is a middleware
const upload = multer({
    storage,
});

// upload.single('image') is a middleware
router.post('/', upload.single('image'), (req, res) => {
    res.send({
        message: 'Image uploaded',
        image: `/${req.file.path}`
    }
    );
});


export default router;
