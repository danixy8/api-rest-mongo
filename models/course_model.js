const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new mongoose.Schema({ 
  name: String,
  email: String,
})
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  author: authorSchema,
  // author: {
  //   type: Schema.Types.ObjectId, ref: 'User'
  // },
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