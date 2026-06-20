const express = require('express')
const router = express.Router()

const {getPost} = require('../Controllers/controllerPost')


router.get('/', getPost)

module.exports=router