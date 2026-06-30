const request = require('supertest')
const app = require('../src/app')


describe('GET /comments', () => {
    test('muestra los comentarios', async () => {
        const response = await request(app)
            .get('/comments')
        
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
    })
})

describe('GET /comments/:id', () => {
    test('muestra los comentarios por id', async () => {
        const response = await request(app)
            .get(`/comments/1`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('comment_content')
        expect(response.body).toHaveProperty('author_id')
        expect(response.body).toHaveProperty('post_id')
        expect(response.body).toHaveProperty('created_at')        
    })

    test('rechaza id invalido', async () => {
        const response = await request(app)
            .get('/comments/abc')

        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('El id debe ser un numero')
    })

    test('rechaza id de comentario no encontrado', async () => {
        const response = await request(app)
            .get('/comments/999')

        expect(response.statusCode).toBe(404)
        expect(response.body.error).toBe('comment no encontrado')
    })
})

describe('POST /comments', () => {
    test('crea un comentario valido', async () => {
        const response = await request(app)
            .post('/comments')
            .send({
                comment_content: "comentario de ejemplo", 
                author_id: 1,
                post_id: 1
            })

        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('comment_content')
        expect(response.body).toHaveProperty('author_id')
        expect(response.body).toHaveProperty('post_id')
        expect(response.body).toHaveProperty('created_at')

        await request(app).delete(`/comments/${response.body.id}`)   
    })

    test('rechaza crear comentario falta comment_content',async () => {
        const response = await request(app)
            .post('/comments')
            .send({
                author_id: 1,
                post_id: 1
            })
        
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('El comment_content es obligatorio')
    })

    test('rechaza crear comentario falta author_id',async () => {
        const response = await request(app)
            .post('/comments')
            .send({
                comment_content: "comentario de ejemplo",
                post_id: 1
            })
        
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('El author_id es obligatorio')
    })

    test('rechaza crear comentario falta post_id',async () => {
        const response = await request(app)
            .post('/comments')
            .send({
                comment_content: "comentario de ejemplo",
                author_id: 1,
            })
        
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('El post_id es obligatorio')
    })

    test('rechaza crear comentario error en comment_content',async () => {
        const response = await request(app)
            .post('/comments')
            .send({
                comment_content: " ",
                author_id: 1,
                post_id: 1
            })
        
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('El comment_content no puede ser espacios vacios')
    })

    test('rechaza crear comentario error en author_id no existe',async () => {
        const response = await request(app)
            .post('/comments')
            .send({
                comment_content: "comentario de ejemplo",
                author_id: 999,
                post_id: 1
            })
        
        expect(response.statusCode).toBe(404)
        expect(response.body.error).toBe('El author_id no existe')
    })

    test('rechaza crear comentario error en post_id no existe',async () => {
        const response = await request(app)
            .post('/comments')
            .send({
                comment_content: "comentario de ejemplo",
                author_id: 1,
                post_id: 999
            })
        
        expect(response.statusCode).toBe(404)
        expect(response.body.error).toBe('El post_id no existe')
    })

})

describe('PUT /comments/:id', () => {
    test('actualiza correctamente un comentario', async () => {
        //preparo el entorno para tener un comentario que actualizar
        const exampleComment = await request(app)
            .post('/comments')
            .send({
                comment_content: "comentario de ejemplo", 
                author_id: 1,
                post_id: 1
            })
        
        const response = await request(app)
            .put(`/comments/${exampleComment.body.id}`)
            .send({
                comment_content: "comentario actualizado"
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.comment_content).toBe("comentario actualizado")


        await request(app).delete(`/comments/${exampleComment.body.id}`)           
    })

    test('rechaza actualizar comentario por body vacio', async () => {
        const response = await request(app)
            .put('/comments/1')
            .send({})

        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('El body no puede estar vacio')
    })

    test('rechaza actualizar por comentario inexistente', async () => {
        const response = await request(app)
            .put('/comments/999')
            .send({
                comment_content: 'Comentario actualizado'
            })
        
        expect(response.statusCode).toBe(404)
        expect(response.body.error).toBe('El comment que quiere actualizar no existe')
    })
})

describe('DELETE /comments/:id', () => {
    test('elimina correctamente un comentario', async () => {
        //preparo el entorno para tener un comentario que eliminar
        const exampleComment = await request(app)
            .post('/comments')
            .send({
                comment_content: "comentario de ejemplo",
                author_id: 1,
                post_id: 1
            })
        
        const response = await request(app)
            .delete(`/comments/${exampleComment.body.id}`)

        expect(response.statusCode).toBe(204)
    })

    test('rechaza eliminar comentario por id invalido', async () => {
        const response = await request(app)
            .delete('/comments/abc')
        
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('El id debe ser un numero')
    })

    test('rechaza eliminar comentario por comentario inexistente', async () => {
        const response = await request(app)
            .delete('/comments/9999')
        
        expect(response.statusCode).toBe(404)
        expect(response.body.error).toBe('El comment a eliminar no existe')
    })
})
