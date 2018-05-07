"use strict";

const router = require('express').Router();
const Task = require('../models/task');
const { validationResult } = require('express-validator/check');
const validation = require('../validation');

router.get('/', (req, res, next) => {
  Task.find()
    .then(data => {
      res.send(data)
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Task.findById(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next);
});

router.post('/', validation.task, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }  

  const task = new Task(req.body);
  task.save()
    .then((data) => {
      res.send(data);
    })
    .catch(next)
});

router.put('/:id', (req, res, next) => {
  Task.findById(req.params.id)
    .then(task => {
      task = Object.assign(task, req.body);
      return task.save()
    })
    .then((data) => {
      res.send(data);
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Task.findByIdAndRemove(req.params.id, req.body)
    .then((data) => {
      res.send(data);
    })
    .catch(next);
});

module.exports = router;