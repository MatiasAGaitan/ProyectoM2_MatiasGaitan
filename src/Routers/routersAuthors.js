const express = require('express')
const router = express.Router()

// importamos los controladores
const {
    getAuthors,
    getAuthorId,
    postAuthor,
    putAuthor,
    deleteAuthor
    } = require('../Controllers/controllerAuthors')

// importamos los middlewares
const {
    validateId
} = require('../Middlewares/validators')

router.get('/', getAuthors )
router.get('/:id', validateId , getAuthorId )
router.post('/', postAuthor )
router.put('/:id', validateId , putAuthor )
router.delete('/:id', validateId , deleteAuthor)

module.exports=router