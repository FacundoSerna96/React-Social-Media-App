const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const morgan  = require('morgan');
const dotenv  = require('dotenv');
const helmet  = require('helmet');

const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

const multer = require('multer');
const path = require('path');


dotenv.config();

mongoose.connect(process.env.MONGO_URL, ()=> {
    console.log('Conectado a la base de datos!');
});

app.use('/images', express.static(path.join(__dirname, 'public/images')));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);


app.listen(8080, () => {
    console.log('Escuchando en el puerto 8080');
})  

