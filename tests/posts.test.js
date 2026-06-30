const request = require('supertest')
const app = require('../src/app')

describe('GET /posts', () => {
    test('muestra los posts', async () => {
        const response = await request(app)
            .get('/posts')

        expect(response.statusCode).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
    })
})

describe('GET /posts/:id', () => {
    test('muestra el post del id', async () => {
        const response = await request(app)
            .get(`/posts/1`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('title')
        expect(response.body).toHaveProperty('content')
        expect(response.body).toHaveProperty('author_id')
        expect(response.body).toHaveProperty('created_at')
        expect(response.body).toHaveProperty('published') 
    })

    test('rechaza al pasar id invalido (string)', async () => {
        const response = await request(app)
            .get('/posts/abc')
        
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('El id debe ser un numero')
    })

    test('rechaza al pasar id invalido (decimal)', async () => {
        const response = await request(app)
            .get('/posts/1.5')
        
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('El id debe ser un numero entero')
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
        const response = await request(app)
            .get(`/posts/author/1`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toBeInstanceOf(Array) 
    })
})

describe('POST /posts', () => {
    test('crea post valido', async () => {
        const response = await request(app)
            .post('/posts')
            .send({
                title: "Example",
                content: "Content of Example",
                author_id: 1
            })
        
        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('id')
        expect(response.body.title).toBe('Example')
        expect(response.body.content).toBe('Content of Example')
        expect(response.body.author_id).toBe(1)

        //limpio el la base de datos del post creado
        await request(app).delete(`/posts/${response.body.id}`)
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
        // preparo el entorno para tener un post que actualizar
        const examplePost = await request(app)
            .post('/posts')
            .send({
                title: "Example",
                content: "Content of Example",
                author_id: 1
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
        await request(app).delete(`/posts/${examplePost.body.id}`)   
    })

    test('rechaza al pasar un body vacio', async () => {
        const response = await request(app)
            .put(`/posts/1`)
            .send({})

        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('El body no puede estar vacio')
    })

    test('rechaza al pasar un titulo invalido', async () => {
        const response = await request(app)
            .put(`/posts/1`)
            .send({
                title: " "
            })

        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('El titulo no puede ser espacios vacios')    
    })

    test('rechaza al pasar un contenido invalido', async () => {
        const response = await request(app)
            .put(`/posts/1`)
            .send({
                content: " "
            })

        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('El contenido no puede ser espacios vacios')
    })
    
    test('rechaza al pasar un published invalido', async () => {
        const response = await request(app)
            .put(`/posts/1`)
            .send({
                published: "true"
            })

        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('published debe ser true o false (boolean)') 
    })

    test('rechaza al pasar un author_id invalido', async () => {
        const response = await request(app)
            .put(`/posts/1`)
            .send({
                author_id: "abc"
            })

        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('El author_id debe ser un numero')
    })

    test('rechaza al pasar un author_id inexistente', async () => {
        const response = await request(app)
            .put(`/posts/1`)
            .send({
                author_id: 999
            })

        expect(response.statusCode).toBe(404)
        expect(response.body.error).toBe('El author_id no existe')
    })

})

describe('DELETE /posts/:id', () => {
    test('elimina post correctamente', async () => {
        //preparo el entorno para tener un post que eliminar
        const examplePost = await request(app)
            .post('/posts')
            .send({
                title: "Example",
                content: "Content of Example",
                author_id: 1
            })

        const response = await request(app)
            .delete(`/posts/${examplePost.body.id}`)

        expect(response.statusCode).toBe(204)
    })

    test('rechaza al pasar un id de post que no existe', async () => {
        const response = await request(app)
            .delete(`/posts/999`)

        expect(response.statusCode).toBe(404)
        expect(response.body.error).toBe('El post que quiere eliminar no existe')
    
    })
})