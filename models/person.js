const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3
  },
  phone: {
    type: String,
    minLength: 5
  },
  street: {
    type: String,
    required: true,
    minlength: 5
  },
  city: {
    type: String,
    required: true,
    minlength: 3
  }
})

module.exports = mongoose.model('Person', schema)