const{loadEnvFile} = require('node:process')
loadEnvFile('.env')


const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const errorHandler = require('./src/Middlewares/errorHandlers')

const routersAuthors = require('./src/Routers/routersAuthors')
const routersPosts = require('./src/Routers/routersPosts')

app.use(express.json())
app.use('/authors',routersAuthors)
app.use('/posts',routersPosts)

app.use(errorHandler)


app.listen(PORT, () => {
    console.log("el servidor esta corriendo en el PORT" , PORT)
})