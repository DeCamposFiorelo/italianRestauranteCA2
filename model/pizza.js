//database creation
const mongoose = require('mongoose')

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price:{
      type: Number,
  },
  description:{
      type:String
  }
})

module.exports = mongoose.model('pizzas', pizzaSchema)