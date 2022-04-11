const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  description: { 
    type: String, 
    require: false
  },
  status: { 
    type: Boolean,
    default: true
  },
  imagen: {
    type: String,
    require: false
  },
  students: { 
    type: Number,
    default: 0
  },
  note: { 
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Course', courseSchema);