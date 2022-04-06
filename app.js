const users = require('./routes/users');
const courses = require('./routes/courses');
const express = require('express');
const mongoose = require('mongoose');

//conectarnos a la base de datos
mongoose.connect('mongodb://localhost:27017/demo')
  .then(()=> console.log('conectado a mongo'))
  .catch(err => console.log('No se pudo conectar con MongoDB...', err))

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/users', users);
app.use('/api/courses', courses);

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`running in port ${port}`)
});