const express = require('express')
const router = express.Router()

// importamos los controladores
const {
    getPost,
    getPostId,
    getPostAuthorId
} = require('../Controllers/controllerPost')

// importamos los middlewares
const {
    validateId,
    validateAuthorId
} = require('../Middlewares/validators')


// rutas posibles para posts
router.get('/', getPost)
router.get('/author/:authorId',validateAuthorId, getPostAuthorId)
router.get('/:id',validateId, getPostId)

module.exports=router