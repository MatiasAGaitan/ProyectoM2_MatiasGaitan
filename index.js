const PORT = process.env.PORT || 3000

const app = require('./src/app')

app.listen(PORT, () => {
    console.log("el servidor esta corriendo en el puerto:" , PORT)
})