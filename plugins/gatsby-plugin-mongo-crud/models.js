const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postModel = new Schema({
  title: { type: String} ,
  body: { type: String} ,
  image: { type: String} ,
  latitude: { type: Number} ,
  longitude: { type: Number} ,
})


const layerModel = new Schema({
  name: { type: String} ,
  type: { type: String} ,
}, { strict: false })

//List all models for export
module.exports = {
  Post: mongoose.model('post', postModel),
  Layer: mongoose.model('layer', layerModel)
}
