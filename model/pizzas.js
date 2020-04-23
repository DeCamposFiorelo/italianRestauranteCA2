const mongoose = require('mongoose')

const pizzasSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('pizzas', pizzasSchema)