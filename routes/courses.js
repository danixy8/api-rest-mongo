const express = require('express');
const route = express.Router();
const Course = require('../models/course_model');
const verificarToken = require('../middlewares/auth');

route.get('/', verificarToken, (req, res) => {
  let result = listActiveCourses();
  result.then((courses) => {
    res.json(courses)
  }).catch((err) => {
    res.status(400).json({
      error: err
    })
  });
});

route.post('/', verificarToken, (req, res) => { 
  let result = createCourse(req);

  result.then(course => { 
    res.json({
      valor: course
    })
  }).catch(err => {
    res.status(400).json({ 
      error: err
    })
  });
});

route.put('/:id', verificarToken, (req, res) => {
  let result = updatedCourse(req.params.id, req.body);

  result.then(course => { 
    res.json({ 
      course
    })
  }).catch(err => { 
    res.status(400).json({ 
      error: err
    })
  });
});

route.delete('/:id', verificarToken, (req, res) => {
  let result = disableCourse(req.params.id);
  result.then(course => { 
    res.json({ 
      course: course
    })
  }).catch(err => { 
    res.status(400).json({ 
      error: err
    })
  });
});

async function createCourse(req){
  let course = new Course({
    title: req.body.title,
    // author: req.user._id,
    author: req.user,
    description: req.body.description
  });
  return await course.save();
}

async function listActiveCourses(){
  let courses = await Course
  .find({status: true})
  .populate('author', 'name -_id');
  return courses;
}

async function updatedCourse(id, body){ 
  let course = await Course.findOneAndUpdate({_id: id}, {
    $set: {
      title: body.title,
      description: body.description
    }
  }, {new: true})
  return course;
}

async function disableCourse(id){ 
  let course = await Course.findOneAndUpdate({_id: id}, {
    $set: {
      status: false,
    } 
  },{new: true});
  return course;
};

module.exports = route;