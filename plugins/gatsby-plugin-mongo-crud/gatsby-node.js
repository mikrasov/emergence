const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

exports.onPreBootstrap = () => {
  const port = 3000
  const app = express()
  const db = mongoose.connect('mongodb://localhost:27017/emergence', {useNewUrlParser: true}, function(error){
    if(error){
      console.log(error)
      process.exit()
    }
  })


  app.use(bodyParser.json({limit: '50mb', extended: true}))
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

  app.use('/', require('./routes'))

  app.listen(port, () => console.log(`MongoDB CRUD Server started on http://localhost:${port}`))
}