const model = require('../models/books')

/* GET ALL BOOKS */
const getAll = (req, res, next) => {
  let response = model.getAll(req.query.limit)
  res.status(200).json(response)
}

/* GET ONE BOOK */
const getOne = (req, res, next) => {
  let response = model.getOne(req.params.id)
  if (!response) next({ status: 404, message: `Book with ID:${req.params.id} not found` })
  res.status(200).json( response )
}

/* GET ALL AUTHORS FOR A BOOK */
const getAllAuthorsByBook = (req, res, next) => {
  let response = model.getAllAuthorsByBook(req.params.id)
  res.status(200).json( response )
}

/* GET AN AUTHOR BY THEIR BOOK */
const getOneAuthorByBook = (req, res, next) => {
  let response = model.getOneAuthorByBook(req.params.id, req.params.aid)
  if (!response) next({ status: 404, message: 'Author not found' })
  res.status(200).json( response )
}

/* CREATE NEW BOOK */
const create = (req, res, next) => {
  const { name, borrowed, description, authors } = req.body
  let errors = []
  if (!name || name.length > 30 || name === undefined) errors.push('Name (must be under 30 characters)')
  if (!description || description === undefined) errors.push('Description')
  if (borrowed === undefined || (typeof borrowed) !== "boolean") errors.push('Borrowed')
  if (authors === undefined || !Array.isArray(authors) ) {
    errors.push('Author(s) must be an array')
  } else {
    if (authors.length < 1) errors.push('At least one author needed')
    authors.forEach(author => {
      if (!author.firstName || !author.lastName) errors.push('Author\'s First AND Last name')
    })
  }
  if (errors.length > 0) {
    let message = `Following fields are required: ${errors[0]}`
    for (let i = 1; i < errors.length; i++) {
      message += `, ${errors[i]}`
    }
    return next( { status: 400, message: message } )
  }

  let response = model.create(name, borrowed, description, authors)
  if (response.status) next( response )
  res.status(201).json( response )
}

/* CREATE NEW AUTHORS */
const createAuthors = (req, res, next) => {
  let errors = []
  let authors = req.body.authors
  if (authors === undefined || authors.length < 1) errors.push('Author(s)')
  authors.forEach(author => {
    if (!author.firstName || !author.lastName) errors.push('Author\'s First AND Last name')
  })
  if (errors.length > 0) {
    let message = `Following fields are required: ${errors[0]}`
    for (let i = 1; i < errors.length; i++) {
      message += `, ${errors[i]}`
    }
    return next( { status: 400, message: message } )
  }
  const response = model.createAuthors(req.params.id, authors)
  if (response.status) next( response )
  res.status(200).json( response )
}

/* ALTER/PATCH BOOK (NO AUTHORS WILL BE ALTERED) */
const update = (req, res, next) => {
  let response = model.update(req.params.id, req.body)
  if (response.status) next( response )
  res.status(200).json( response )
}

/* UPDATE A SINGLE AUTHOR */
const updateAuthor = (req, res, next) => {
  let response = model.updateAuthor(req.params.id, req.params.aid, req.body)
  if (response.status) next( response )
  res.status(200).json( response )
}

/* DELETE A SINGLE BOOK (AND IT'S AUTHORS) */
const destroy = (req, res, next) => {
  let response = model.destroy(req.params.id)
  if (response.status) next({ response })
  res.status(200).json( response )
}

/* DELETE A SINGLE AUTHOR */
const destroyAuthor = (req, res, next) => {
  let response = model.destroyAuthor(req.params.id, req.params.aid)
  if (response.status) next ({ response })
  res.status(200).json( response )
}

module.exports = { getAll, getOne, getAllAuthorsByBook, getOneAuthorByBook, create, createAuthors, update, updateAuthor, destroy, destroyAuthor }
