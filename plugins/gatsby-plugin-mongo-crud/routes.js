const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const mongooseCrudify = require('mongoose-crudify');
const Models = require('./models')

//Preload API Documentation
let doc = "<h1>Welcome to the Emergence API</h1>"
try {
  mongoose.connection.db.listCollections().toArray(function(err, col) {
    if (err) {
      console.log(err)
    } else {
      col.map(c => {
        doc += "<a href='/api/" + c.name + "'>" + c.name + "</a>" + "<br>"
      })
    }
  })
}
catch (err) {
  doc += "No collections to display"
}

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', (req, res) => {
  res.send(doc)
})

router.use( '/posts', mongooseCrudify({
    Model: Models.Post,
    selectFields: '-__v', // Hide '__v' property
  })
)

router.use( '/layers', mongooseCrudify({
    Model: Models.Layer,
    selectFields: '-__v', // Hide '__v' property
  })
)


module.exports = router
