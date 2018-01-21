const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/books');

//done
router.get('/', ctrl.getAll)
//done
router.get('/:id', ctrl.getOne)
//done
router.get('/:id/authors', ctrl.getAllAuthorsByBook)
//done
router.get('/:id/authors/:aid', ctrl.getOneAuthorByBook)
//done
router.post('/', ctrl.create)
//done
router.post('/:id/authors', ctrl.createAuthors)
//done
router.put('/:id', ctrl.update)
//done
router.put('/:id/authors/:aid', ctrl.updateAuthor)
//done
router.delete('/:id', ctrl.destroy)
//done
router.delete('/:id/authors/:aid', ctrl.destroyAuthor)

module.exports = router
