const mongoose = require('mongoose');
const Models = require('./gatsby-plugin-mongo-crud/models');

console.log("Loading Test Map Data")
const db = mongoose.connect('mongodb://localhost:27017/emergence', {useNewUrlParser: true}, function(error){
  if(error){
    console.log(error)
    process.exit()
  }
})

const heatmap = new Models.Layer({
  name: "RSSI - Sample Heatmap",
  type: "heatmap",
  max: 8,
  radius: 0.001,
  latField: 'lat',
  lngField: 'lng',
  valueField: 'count',
  data: [
    {lat: 34.414, lng:-119.876, count: 8},
    {lat: 34.415, lng:-119.879, count: 5}
  ]

})
heatmap.save()

console.log("Done")
