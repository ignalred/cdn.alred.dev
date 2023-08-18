const express = require('express');
const multer = require('multer');
const path = require('path');
const server = express();
const port = 80;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });
server.post('/upload_file', upload.single('file'), (req, res) => {
    res.redirect(`${req.protocol + '://' + req.get('host')}/uploads/${req.file.filename}`);
});
server.use(express.static('www'));
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));
server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});
