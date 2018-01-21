const fs = require('fs')
const uuid = require('uuid/v4')
const format = 'utf8'
const dbPath = __dirname + '/../db/index.json'

const dbContents = fs.readFileSync(dbPath, format)
const db = JSON.parse(dbContents)

/* GET ALL BOOKS */
function getAll (limit) {
  return limit ? db.slice(0, limit) : db
}

/* GET ONE BOOK */
function getOne (id) {
  const response = db.find(book => book.id === id)
  return response
}

/* GET ALL AUTHORS BY THEIR BOOK */
function getAllAuthorsByBook (bookId) {
  const book = getOne(bookId)
  return book.authors
}

/* GET AN AUTHOR VIA THEIR BOOK */
function getOneAuthorByBook (bookId, aId) {
  const authors = getAllAuthorsByBook(bookId)
  const response = authors.find(author => author.id === aId)
  return response
}

/* CREATE NEW BOOK */
function create (name, borrowed, description, authors) {
  let newAuthorsArr = []
  authors.forEach(author => {
    let newAuthor = {
      id: uuid(),
      firstName: author.firstName,
      lastName: author.lastName
    }
    newAuthorsArr.push(newAuthor)
  })
  let newBook = {
    id: uuid(),
    name,
    borrowed,
    description,
    authors: newAuthorsArr
  }
  db.push(newBook)
  fs.writeFileSync(dbPath, JSON.stringify(db))
  return newBook
}

/* CREATE AUTHORS */
function createAuthors(id, newAuthors) {
  let book = db.find(book => book.id === id)
  let index = db.indexOf(book)
  newAuthors.forEach(author => {
    let newAuthor = {
      id: uuid(),
      firstName: author.firstName,
      lastName: author.lastName
    }
    book.authors.push(newAuthor)
  })
  fs.writeFileSync(dbPath, JSON.stringify(db))
  return book.authors
}

/* ALTER/PATCH BOOK (NO AUTHORS WILL BE ALTERED) */
function update (id, body) {
  const foundOG = db.find(book => book.id === id)
  let index = db.indexOf(foundOG)
  console.log(foundOG)
  const { name, borrowed, description, authors } = body
  let newUpdate = {
    id: foundOG.id,
    name: name || foundOG.name,
    borrowed: borrowed || foundOG.borrowed,
    description: description || foundOG.description,
    authors: foundOG.authors
  }
  db[index] = newUpdate
  fs.writeFileSync(dbPath, JSON.stringify(db))
  return newUpdate
}

/* ALTER/PATCH ONLY AN AUTHOR */
function updateAuthor (id, authId, body) {
  const bookToUpdate = db.find(book => book.id === id)
  if (!bookToUpdate) return {status: 404, message: `Book with ID: ${id} not found`}
  const index = db.indexOf(bookToUpdate)
  let authToChange = bookToUpdate.authors.find(author => author.id === authId)
  if (!authToChange) return {status: 404, message: `Author with ID: ${authId} not found`}
  authToChange.firstName = body.firstName || authToChange.firstName
  authToChange.lastName = body.lastName || authToChange.lastName
  fs.writeFileSync(dbPath, JSON.stringify(db))
  return authToChange
}

/* DELETE A SINGLE BOOK */
function destroy (id) {
  const response = db.find(book => book.id === id)
  if (!response) return { status: 404, message: `Book with the ID: ${id} was not found.` }
  const index = db.indexOf(response)
  db.splice(index, 1)
  fs.writeFileSync(dbPath, JSON.stringify(db))
  return response
}

/* DELETE A SINGLE AUTHOR VIA IT'S BOOK */
function destroyAuthor (id, aId) {
  const book = db.find(book => book.id === id)
  if (!book) return {status: 404, message: `Book with ID:${id} not found`}
  const bookIndex = db.indexOf(book)
  const foundAuthor = book.authors.find(author => author.id === aId)
  if (!foundAuthor) return {status: 404, message: `Author with ID:${aId} not found`}
  const authIndex = book.authors.indexOf(foundAuthor)
  db[bookIndex].authors.splice(authIndex, 1)
  fs.writeFileSync(dbPath, JSON.stringify(db))
  return foundAuthor
}

module.exports = { getAll, getOne, getAllAuthorsByBook, getOneAuthorByBook, create, createAuthors, update, updateAuthor, destroy, destroyAuthor }
