const express = require('express')
const router = express.Router()

const {
    getAuthors,
    getAuthorId,
    postAuthor,
    putAuthor,
    deleteAuthor
    } = require('../Controllers/controllerAuthors')



router.get('/', getAuthors)
router.get('/:id', getAuthorId)
router.post('/',postAuthor)
router.put('/:id',putAuthor)
router.delete('/:id',deleteAuthor)

module.exports=router