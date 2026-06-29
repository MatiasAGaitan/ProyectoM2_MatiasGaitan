const express = require('express')
const router = express.Router()

const {
    getComments,
    getCommentsId,
    postComments,
    deleteComments,
    putComments
} = require('../Controllers/controllerComments')

const {
    validateId
} = require('../Middlewares/validateParams')

router.get('/',getComments)
router.get('/:id',validateId,getCommentsId)
router.post('/',postComments)
router.put('/:id',validateId,putComments)
router.delete('/:id',validateId,deleteComments)

module.exports = router