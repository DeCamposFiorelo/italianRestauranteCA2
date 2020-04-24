const mongoose = require('mongoose')

const sideSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price:{
      type:Number
  },
  description:{
      type:String
  }

})

module.exports = mongoose.model('sides', sideSchema)