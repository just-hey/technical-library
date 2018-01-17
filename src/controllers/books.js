const model = require('../models/books');

const getAll = (req, res, next) => {
  let response = model.getAll(req.query.limit)
  res.send( { response } )
}

const getOne = (req, res, next) => {
  let response = model.getOne(req.params.id)
  if (!response) next({ status: 404, message: 'Book not found' })
  res.send( { response } )
}

const create = (req, res, next) => {
  let response = model.create(req.body)
  res.send( { response } )
}

module.exports = { getAll, getOne, create }
