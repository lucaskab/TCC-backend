const multer = require('multer');
const path = require('path');
const crypto = require('crypto');



module.exports = {
    dest: path.resolve(__dirname, "..", "images"),
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path.resolve(__dirname, "..", "images"))
        },
        filename: (req, file, callback) => {
            crypto.randomBytes(16, (err, hash) => {
                 if(err) callback(err);

                 const fileName = `${file.originalname}`;

                 callback(null, fileName);
            });
        },
    }),
    limits: {
        fileSize: 10 * 1024 * 1024,

    },
    fileFilter: (req, file, callback) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];


        if(allowedMimes.includes(file.mimetype)){
            callback(null,true);
        }
        else {
            callback(new Error('Invalid file type'))
        }
    }
};