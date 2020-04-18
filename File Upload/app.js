const express = require('express')
const app = express()
const multer = require('multer')
const ejs = require('ejs')
const path = require('path')

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//Set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialise Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myFile');

const uploads = multer({
    storage: storage
}).array('myFiles', 5);

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

//Routes
app.get('/', (req, res) => {
    res.render('index')
})

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('index', {
                msg: err
            });
        } else {
            console.log(req.file);
            res.send('File Uploaded!');
        }
    })
})

app.post('/uploads', (req, res) => [
    uploads(req, res, (err) => {
        if (err) {
            res.render('index', {
                errmsg: err
            });
        } else {
            console.log(req.files);
            res.send('File Uploaded!');
        }
    })
])

app.listen(3000, function () {
    console.log("Welcome to File Upload");
})