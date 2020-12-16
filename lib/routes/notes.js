const { Router } = require('express'); 
const Note = require('../models/Note'); 

module.exports = Router()
  .post('/', (req, res, next) => {
    Note
      .insert(req.body)
      .then(note => res.send(note))
      .catch(next);
  });
