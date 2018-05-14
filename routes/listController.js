"use strict";

const router = require('express').Router();
const List = require('../models/list');
const { validationResult } = require('express-validator/check');
const validation = require('../validation');

router.get('/', (req, res, next) => {  
  List.schema.methods.updateData((err, data) => {
    if (err) next(err);      
    else res.send(data);
  });
});

router.get('/:id', (req, res, next) => {
  List.findById(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next);
});

router.post('/', validation.list, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }  

  const list = new List(req.body);
  list.save()
    .then((data) => {
      res.send(data);
    })
    .catch(next)
});

router.put('/:id', (req, res, next) => {
  List.findById(req.params.id)
    .then(list => {
      list = Object.assign(list, req.body);
      return list.save()
    })
    .then((data) => {
      res.send(data);
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  List.findByIdAndRemove(req.params.id, req.body)
    .then((data) => {
      res.send(data);
    })
    .catch(next);
});

module.exports = router;