const request = require('supertest')
const app = require('../src/app')

describe('GET /authors', () => {
    test('muestra los autores', async () => {
        const response = await request(app)
            .get('/authors')
        
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
    })
})

describe('GET /authors/:id', () => {
    test('muestra el autor por id', async () => {
        // preparo el entorno para actualizar un usuario
        const email = `example_${Date.now()}@example.com`
        const exampleAuthor = await request(app)
            .post('/authors')
            .send({
                name: "Example",
                email: email,
                bio:"biografia de ejemplo"
            })

        const response = await request(app)
            .get(`/authors/${exampleAuthor.body.id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('name')
        expect(response.body).toHaveProperty('email')

        // limpio el entorno 
        await request(app).delete(`/authors/${exampleAuthor.body.id}`)
    })

    test('rechaza al pasar id no valido (String)', async () => {
        const response = await request(app)
            .get('/authors/abc')

        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe("El id debe ser un numero")
    })

    test('rechaza al pasar id no valido(Decimal)', async () => {
        const response = await request(app)
            .get('/authors/1.5')

        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe("El id debe ser un numero entero")
    })

    test('rechaza al pasar id no valido(Negativo)', async () => {
        const response = await request(app)
            .get('/authors/-1')

        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe("El id debe ser mayor a 0")
    })

    test('rechaza al no encontrar el autor', async () => {
        const response = await request(app)
            .get('/authors/999')

        expect(response.statusCode).toBe(404)
        expect(response.body.error).toBe('Autor no encontrado')
    })
})

describe('POST /authors', () => {
    test('crear autor valido', async () => {
        const email = `example_${Date.now()}@example.com`
        const response = await request(app)
            .post('/authors')
            .send({
                name: "Example",
                email: email,
                bio: "Example bio"
            })

        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('id')
        expect(response.body.name).toBe('Example')
        expect(response.body.email).toContain(email)
        expect(response.body.bio).toBe('Example bio')

        // elimino autor creado para que el test se pueda repetir
        await request(app)
            .delete(`/authors/${response.body.id}`)
    })

    test('rechaza al NO pasar name', async () => {
        const response = await request(app)
            .post('/authors')
            .send({
                email: "Example@example.com",
                bio: "Example bio"
            })

        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('El nombre es obligatorio')
    })

    test('rechaza al NO pasar email', async () => {
        const response = await request(app)
            .post('/authors')
            .send({
                name: "Example",
                bio: "Example bio"
            })

        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('El email es obligatorio')
    })

        test('rechaza al pasar email invalido', async () => {
        const response = await request(app)
            .post('/authors')
            .send({
                name: "Example",
                email: "Exampleexample.com",
                bio: "Example bio"
            })

        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('El email debe tener un formato valido')
    })

        test('rechaza al pasar email ya existente', async () => {
        // preparo el entorno para provocar el 409
        const email = `example_${Date.now()}@example.com`
        const exampleAuthor = await request(app)
            .post('/authors')
            .send({
                name: "Example",
                email: email
            })

        const response = await request(app)
            .post('/authors')
            .send({
                name: "Example",
                email: email,
                bio: "Example bio"
            })

        expect(response.statusCode).toBe(409)
        expect(response.body.error).toBe('El email ya esta siendo utilizado')
        // limpio el entorno 
        await request(app).delete(`/authors/${exampleAuthor.body.id}`)
    })

})

describe('PUT /authors/:id', () => {
    test('actualiza correctamente el autor', async () => {
        // preparo el entorno para actualizar un usuario
        const email = `example_${Date.now()}@example.com`
        const exampleAuthor = await request(app)
            .post('/authors')
            .send({
                name: "Example",
                email: email,
                bio:"biografia de ejemplo"
            })
        
        const response = await request(app)
            .put(`/authors/${exampleAuthor.body.id}`)
            .send({
                name: "UpdateName"
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBe(exampleAuthor.body.id)
        expect(response.body.name).toBe("UpdateName")
        expect(response.body.email).toBe(exampleAuthor.body.email)

        // limpio el entorno 
        await request(app).delete(`/authors/${exampleAuthor.body.id}`)
    })

    test('rechaza al pasarle un body vacio', async () => {
        // preparo el entorno para actualizar un autor
        const email = `example_${Date.now()}@example.com`
        const exampleAuthor = await request(app)
            .post('/authors')
            .send({
                name: "Example",
                email: email,
                bio:"biografia de ejemplo"
            })
        
        const response = await request(app)
            .put(`/authors/${exampleAuthor.body.id}`)
            .send({
            })

        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('El body no puede estar vacio')

        // limpio el entorno 
        await request(app).delete(`/authors/${exampleAuthor.body.id}`)
    })
})

describe('DELETE /authors/:id', () => {
    test('elimina correctamente el autor', async () => {
        // preparo el entorno para eliminar un autor
        const email = `example_${Date.now()}@example.com`
        const exampleAuthor = await request(app)
            .post('/authors')
            .send({
                name: "Example",
                email: email,
                bio:"biografia de ejemplo"
            })
        
        const response = await request(app)
            .delete(`/authors/${exampleAuthor.body.id}`)
            .send({
            })

        expect(response.statusCode).toBe(204)
    })

    test('rechaza al ser un id inexistente ', async () => {
        const response = await request(app)
            .delete(`/authors/999`)
            .send({
            })

        expect(response.statusCode).toBe(404)
        expect(response.body.error).toBe('Autor no encontrado')
    })
})