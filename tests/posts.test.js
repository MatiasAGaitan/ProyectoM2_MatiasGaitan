const request = require('supertest')
const app = require('../src/app')

describe('GET /posts', () => {
    test('muestra los posts', async () => {
        // preparo el entorno para poder leer los posts con un autor
        const email = `example_${Date.now()}@example.com`
        const exampleAuthor = await request(app)
            .post('/authors')
            .send({
                name: "Example",
                email: email,
            })
        
        const postExample = await request(app)
            .post('/posts')
            .send({
                title: "Example",
                content: "Content of Example",
                author_id: exampleAuthor.body.id
            })

        const response = await request(app)
            .get('/posts')

        expect(response.statusCode).toBe(200)
        expect(response.body).toBeInstanceOf(Array)

        // Limpio el entorno
        await request(app).delete(`/authors/${exampleAuthor.body.id}`)
    })
})

describe('GET /posts/:id', () => {
    test('muestra el post del id', async () => {
        // preparo el entorno para poder leer un posts con un autor
        const email = `example_${Date.now()}@example.com`
        const exampleAuthor = await request(app)
            .post('/authors')
            .send({
                name: "Example",
                email: email,
            })
        
        const examplePost = await request(app)
            .post('/posts')
            .send({
                title: "Example",
                content: "Content of Example",
                author_id: exampleAuthor.body.id
            })

        const response = await request(app)
            .get(`/posts/${examplePost.body.id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('title')
        expect(response.body).toHaveProperty('content')
        expect(response.body).toHaveProperty('author_id')
        expect(response.body).toHaveProperty('created_at')
        expect(response.body).toHaveProperty('published')
        
        // Limpio el entorno
        await request(app).delete(`/authors/${exampleAuthor.body.id}`)     
    })

    test('rechaza al pasar id invalido', async () => {
        const response = await request(app)
            .get('/posts/abc')
        
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('El id debe ser un numero')
    })

    test('rechaza al no encontrar el post', async () => {
        const response = await request(app)
            .get('/posts/999')

        expect(response.statusCode).toBe(404)
        expect(response.body.error).toBe('Post no encontrado')
    })
})

describe('GET /posts/author/author_id', () => {
    test('muestra los posts por el author_id', async () => {
        // preparo el entorno para tener un autor y un post con ese autor
        const email = `example_${Date.now()}@example.com`        
        const exampleAuthor = await request(app)
            .post('/authors')
            .send({
                name:"authorExample",
                email:email
            })
        
        const examplePost = await request(app)
            .post('/posts')
            .send({
                title: "Example",
                content: "Content of Example",
                author_id: exampleAuthor.body.id
            })

        const response = await request(app)
            .get(`/posts/author/${examplePost.body.author_id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toBeInstanceOf(Array)

        // Limpio el entorno
        await request(app).delete(`/authors/${exampleAuthor.body.id}`)   
    })
})

describe('POST /posts', () => {
    test('crea post valido', async () => {
    // preparo el entorno para tener un autor 
        const email = `example_${Date.now()}@example.com`        
        const exampleAuthor = await request(app)
            .post('/authors')
            .send({
                name:"authorExample",
                email:email
            })
        
        const response = await request(app)
            .post('/posts')
            .send({
                title: "Example",
                content: "Content of Example",
                author_id: exampleAuthor.body.id
            })
        
        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('id')
        expect(response.body.title).toBe('Example')
        expect(response.body.content).toBe('Content of Example')
        expect(response.body.author_id).toBe(exampleAuthor.body.id)

        //limpio el entorno
        await request(app).delete(`/authors/${exampleAuthor.body.id}`)
    })

    test('rechaza al no pasar titulo', async () => {
        const response = await request(app)
            .post('/posts')
            .send({
                content: "Content of Example",
                author_id: 1
            })
        
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('El titulo es obligatorio')
    })

    test('rechaza al no pasar author_id', async () => {
        const response = await request(app)
            .post('/posts')
            .send({
                title: "Example",
                content: "Content of Example"
            })
        
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('El author_id es obligatorio')
    })

    test('rechaza al pasar author_id que no existe', async () => {
        const response = await request(app)
            .post('/posts')
            .send({
                title: "Example",
                content: "Content of Example",
                author_id: 999
            })
        
        expect(response.statusCode).toBe(404)
        expect(response.body.error).toBe('El author_id no existe')
    })

    test('rechaza al pasar published invalido', async () => {
        const response = await request(app)
            .post('/posts')
            .send({
                title: "Example",
                content: "Content of Example",
                author_id: 1,
                published: "true"
            })
        
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('published debe ser true o false (boolean)')
    })
})

describe('PUT /posts/:id', () => {
    test('actualiza el post correctamente', async () => {
        // preparo el entorno para tener un post correcto y actualizarlo
        const email = `example_${Date.now()}@example.com`
        const exampleAuthor = await request(app)
            .post('/authors')
            .send({
                name: "Example",
                email: email,
            })
        
        const examplePost = await request(app)
            .post('/posts')
            .send({
                title: "Example",
                content: "Content of Example",
                author_id: exampleAuthor.body.id
            })

        const response = await request(app)
            .put(`/posts/${examplePost.body.id}`)
            .send({
                title: "ExamplePut",
                content: "Content of Example Put"
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.title).toBe('ExamplePut')
        expect(response.body.content).toBe('Content of Example Put')
        
        // Limpio el entorno
        await request(app).delete(`/authors/${exampleAuthor.body.id}`)   
    })

    test('rechaza al pasar un body vacio', async () => {
        // preparo el entorno para tener un post correcto y actualizarlo
        const email = `example_${Date.now()}@example.com`
        const exampleAuthor = await request(app)
            .post('/authors')
            .send({
                name: "Example",
                email: email,
            })
        
        const examplePost = await request(app)
            .post('/posts')
            .send({
                title: "Example",
                content: "Content of Example",
                author_id: exampleAuthor.body.id
            })

        const response = await request(app)
            .put(`/posts/${examplePost.body.id}`)
            .send({})

        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('El body no puede estar vacio')

        // Limpio el entorno
        await request(app).delete(`/authors/${exampleAuthor.body.id}`)     
    })
})

describe('DELETE /posts/:id', () => {
    test('elimina post correctamente', async () => {
        // preparo el entorno para tener un post correcto y eliminarlo
        const email = `example_${Date.now()}@example.com`
        const exampleAuthor = await request(app)
            .post('/authors')
            .send({
                name: "Example",
                email: email,
            })
        
        const examplePost = await request(app)
            .post('/posts')
            .send({
                title: "Example",
                content: "Content of Example",
                author_id: exampleAuthor.body.id
            })

        const response = await request(app)
            .delete(`/posts/${examplePost.body.id}`)

        expect(response.statusCode).toBe(204)

        // Limpio el entorno
        await request(app).delete(`/authors/${exampleAuthor.body.id}`)    
    })

    test('rechaza al pasar un id de post que no existe', async () => {
        const response = await request(app)
            .delete(`/posts/999`)

        expect(response.statusCode).toBe(404)
        expect(response.body.error).toBe('El post que quiere eliminar no existe')
    
    })
})