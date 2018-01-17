const model = require('../models/authors');

const getAll = (req, res, next) => {
  let response = model.getAll()
  res.send( { response } )
}

const getOne = (req, res, next) => {
  let response = model.getOne(req.params.id)
  res.send( { response } )
}

module.exports = { getAll, getOne }
