const { Router } = require('express'); 
const Note = require('../models/Note'); 

module.exports = Router()
//sneaky boy
  .post('/', (req, res, next) => {
    Note
      .insert(req.body)
      .then(note => res.send(note))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Note
      .find()
      .then(notes => res.send(notes))
      .catch(next);
  });
