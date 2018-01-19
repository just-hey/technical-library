const fs = require('fs')
const uuid = require('uuid/v4')
const format = 'utf8'
const dbPath = __dirname + '/../db/index.json'

// function getContents () {
  const dbContents = fs.readFileSync(dbPath, format)
  const db = JSON.parse(dbContents)
//   return db
// }

/* WRITE TO JSON FILE */
function writeContents (input) {
  let newContent = JSON.stringify(input)
  fs.writeFileSync(dbPath, newContent)
}

/* GET ALL BOOKS */
function getAll (limit) {
  // const db = getContents()
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
  return newBook
}

/* CREATE AUTHORS */
function createAuthors(id, authors) {
  let book = getOne(id)
  authors.forEach(author => {
    let newAuthor = {
      id: uuid(),
      firstName: author.firstName,
      lastName: author.lastName
    }
    book.authors.push(newAuthor)
  })
  //write "book.authors" to file
  return book.authors
}

/* ALTER/PATCH BOOK (NO AUTHORS WILL BE ALTERED) */
function update (id, body) {
  const foundOG = db.find(book => book.id === id)
  const { name, borrowed, description, authors } = body
  let newUpdate = {
    id: foundOG.id,
    name: name || foundOG.name,
    borrowed: borrowed || foundOG.borrowed,
    description: description || foundOG.description,
    authors: foundOG.authors
  }
  return newUpdate
}

/* ALTER/PATCH ONLY AN AUTHOR */
function updateAuthor (book, authId, body) {
  let authors = getAllAuthorsByBook(book)
  let authToChange = authors.find(author => author.id === authId)
  console.log(authToChange)
  console.log(body);
}

/* DELETE A SINGLE BOOK */
function destroy (id) {
  const response = db.find(book => book.id === id)
  if (!response) {
    return { status: 404, message: `Book with the ID: ${id} was not found.` }
  }
  const index = db.indexOf(response)
  let newDb = db.splice(index, 1)
  return newDb
}

/* DELETE A SINGLE AUTHOR VIA IT'S BOOK */
function destroyAuthor (id, aId) {

}

module.exports = { getAll, getOne, getAllAuthorsByBook, getOneAuthorByBook, create, createAuthors, update, updateAuthor, destroy, destroyAuthor }
