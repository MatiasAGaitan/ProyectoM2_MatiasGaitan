const { loadEnvFile } = require('node:process');

if (process.env.NODE_ENV !== 'production') {
    loadEnvFile('.env');
}

const PORT = process.env.PORT || 3000

const app = require('./src/app')

app.listen(PORT, () => {
    console.log("el servidor esta corriendo en el puerto:" , PORT)
})