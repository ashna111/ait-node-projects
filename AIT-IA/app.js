const express = require('express')
const app = express();
const mongoose = require('mongoose')
const Auth = require('./auth.model')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const path = require('path')

app.use(bodyParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.set("view engine", "ejs")

//DB connection
mongoose.connect("mongodb://localhost/authentication")

//middleware
const authenticated = (req, res, next) => {
    const userid = req.cookies.userid
    if (userid) {
      next()
    } else {
      res.status(400).send({
        error: 'user not logged in'
      })
    }
  }

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/signup', async (req, res) => {
  const { userid, password } = req.body
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const auth = new Auth({ userid, password: hashedPassword })
  console.log(hashedPassword)
  try {
    await auth.save()
    res.status(200).json({ userid, password, id: auth._id.toString() })
  } catch (err) {
    console.log(err)
  }
})

app.post('/login', async (req, res) => {
  const { userid, password } = req.body
  try {
    const auth = await Auth.findOne({ userid })
    const hashedPassword = auth.password
    const result = await bcrypt.compare(password, hashedPassword)
    if (result === true) {
      res.cookie('userid', userid)
      console.log(req.cookies)
      res.status(200).json('logged in')
    } else {
      res.status(404).json('not found')
    }
  } catch (err) {
    console.log(err)
  }
})

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

app.get('/logout', authenticated, async (req, res) => {
  try {
    res.clearCookie('userid')
    res.status(200).json('logged out')
  } catch (err) {
    console.log(err)
  }
})

app.listen(3000, () => {
    console.log("Authentication Routes!")
})