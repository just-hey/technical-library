const db = require('../db')

function getAll (limit) {
  return limit ? db.books.slice(0, limit) : db.books
}

function getOne (id) {
  let response = db.books.find(book => book.id === id)
  return response
}

function create (id) {
  return db
}

module.exports = { getAll, getOne, create }
