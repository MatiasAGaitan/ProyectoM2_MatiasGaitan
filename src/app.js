const express = require('express')
const app = express()

const routersAuthors = require('./Routers/routersAuthors')
const routersPosts = require('./Routers/routersPosts')

const errorHandler = require('./Middlewares/errorHandlers')

const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./openapi.yaml')

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/authors',routersAuthors)
app.use('/posts',routersPosts)

app.use((req,res,next) => {
    const error = new Error(`Ruta ${req.originalUrl} no encontrada`)
    error.status = 404
    next(error)})

app.use(errorHandler)

module.exports = app