const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const User = require('../models/user');
//const db = "mongodb://testuser:testpw@ds123136.mlab.com:23136/eventsdb";

const db = "mongodb://localhost:27017/gpad3";

//const db = "mongodb+srv://rawdha2019:afisameh-07@cluster0-wovt6.mongodb.net/test?retryWrites=true&w=majority";

// mongoose.Promise = global.Promise;

mongoose.connect(db, function(err) {
  if (err) {
    console.error('Error! ' + err)
  } else {
    console.log('Connected to mongodb')
  }
});
router.post('/register', (req, res) => {
  let userData = req.body
  let user = new User(userData)
  user.save((err, registeredUser) => {
    if (err) {
      console.log(err)
    } else {
      let payload = {
        subject: registeredUser._id
      }
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({
        token
      })
    }
  })
})

router.post('/login', (req, res) => {
  let userData = req.body
  User.findOne({
    email: userData.email
  }, (err, user) => {
    if (err) {
      console.log(err)
    } else {
      if (!user) {
        res.status(401).send('Invalid Email')
      } else
        if (user.pwd !== userData.password) {
          res.status(401).send('Invalid Password')
        } else {
          let payload = {
            subject: user._id
          }
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({
            token
          })
        }
    }
  })
})

module.exports = router;