const fs = require('fs');
const path = require('path');

const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

//   next();
// });

app.get('/api/test', (req, res) => {
  res.status(200).json({
    message: "Hello World"
  });
})

app.use("/api/user", userRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
  });
  
  app.use((error, req, res, next) => {
    if (req.file) {
      fs.unlink(req.file.path, err => {
        console.log(err);
      });
    }
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
  });

uri = "mongodb+srv://ritika1234:08414802718@users.h6wod.mongodb.net/app?retryWrites=true&w=majority"

mongoose
  .connect(uri)
  .then(() => {
    console.log("Server Up and Running.");
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });