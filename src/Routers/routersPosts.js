const express = require('express')
const router = express.Router()


const {
    getPost,
    getPostId,
    getPostAuthorId,
    createPost,
    putPost,
    deletePost
} = require('../Controllers/controllerPost')


const {
    validateId,
    validateAuthorId
} = require('../Middlewares/validators')


router.get('/', getPost)
router.get('/author/:authorId',validateAuthorId, getPostAuthorId)
router.get('/:id',validateId, getPostId)
router.post('/',createPost)
router.put('/:id',validateId,putPost)
router.delete('/:id',validateId,deletePost)

module.exports=router