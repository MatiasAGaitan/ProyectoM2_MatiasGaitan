const{loadEnvFile} = require('node:process')
loadEnvFile('.env')

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.listen(PORT, () => {
    console.log("el servidor esta corriendo en el PORT" , PORT)
})