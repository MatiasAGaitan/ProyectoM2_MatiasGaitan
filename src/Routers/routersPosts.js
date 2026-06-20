const express = require('express')
const router = express.Router()

const {
    getPost,
    getPostId,
    getPostAuthorId
} = require('../Controllers/controllerPost')

router.get('/', getPost)
router.get('/:id', getPostId)
router.get('/author/:authorId', getPostAuthorId)

module.exports=router