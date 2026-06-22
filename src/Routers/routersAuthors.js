const express = require('express')
const router = express.Router()


const {
    getAuthors,
    getAuthorId,
    postAuthor,
    putAuthor,
    deleteAuthor
    } = require('../Controllers/controllerAuthors')


const {
    validateId
} = require('../Middlewares/validateParams')

router.get('/', getAuthors )
router.get('/:id', validateId , getAuthorId )
router.post('/', postAuthor )
router.put('/:id', validateId , putAuthor )
router.delete('/:id', validateId , deleteAuthor)

module.exports=router