const db = require('../db')

function getAll () {
  return db.authors
}

function getOne (id) {
    return db
}

module.exports = { getAll, getOne }
