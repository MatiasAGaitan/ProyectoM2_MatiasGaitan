
const {
    getServicePosts,
    getServicePostId,
    getServicePostAuthorId,
    postServicePost,
    putServicePost,
    deleteServicePost
} = require('../Services/servicePosts')

const {getServiceAuthorId} = require('../Services/serviceAuthors')

const getPost = async (req,res,next) =>{
    try {
        const posts = await getServicePosts()
            res.json(posts)
    } catch (error) {
        next(error)}
}

const getPostId = async(req,res,next) => {
    try {
        const post = await getServicePostId (req.validatedId)

        if(!post){return res.status(404).json({error:'Post no encontrado'})}
        res.status(200).json(post)

    } catch (error) {
        next(error)
    }
}

const getPostAuthorId = async(req,res,next) => {
    try {
        const post = await getServicePostAuthorId (req.validatedAuthorId)

        if (post.length === 0 ){return res.status(404).json({error:'Post no encontrado'})}
        res.status(200).json(post)

    } catch (error) {
        next(error)
    }
}

const createPost = async(req,res,next) => {
    try {
        const {title,content} = req.body
        if(!title || !title.trim()){
            return res.status(400).json({error:'el titulo no puede estar vacio'})}

        if(!content || !content.trim()){
            return res.status(400).json({error:'el contenido no puede estar vacio'})}
        
        if(!req.body.author_id){
            return res.status(400).json({error:'el author_id no puede estar vacio'})}
        const author_id = Number(req.body.author_id)
        if(isNaN(author_id) || !Number.isInteger(author_id) || author_id <= 0 ){
            return res.status(400).json({error:'Valor de author_id incorrecto , debe ser un numero entero y positivo'})}

        // Verifica que author_id exista antes de crear el post.
        const author = await getServiceAuthorId(author_id)
        if(!author){ 
            return res.status(400).json({error: 'El author_id no existe'})}
        
        let {published} = req.body
        if(published !== undefined && typeof published !== 'boolean'){
            return res.status(400).json({error:'published debe ser true o false'})}
        if(published === undefined){published = false}
                        
        const newPost = await postServicePost(title,content,author_id,published)
        res.status(201).json(newPost)
        
    } catch (error) {
        next(error)
    }
}

const putPost = async(req,res,next) => {
    try {
        if (Object.keys(req.body).length === 0){
            return res.status(400).json({error: 'el body no puede estar vacio'})}

        const {title,content,published} = req.body
        if(title !== undefined){
            if(!title || !title.trim()){
                return res.status(400).json({error:'el titulo no puede estar vacio'})}}

        if(content !== undefined){
            if(!content || !content.trim()){
                return res.status(400).json({error:'el contenido no puede estar vacio'})}}

        let author_id
        if(req.body.author_id !== undefined){
            author_id = Number(req.body.author_id)
            if(isNaN(author_id) || !Number.isInteger(author_id) || author_id <= 0 ){
                return res.status(400).json({error:'Valor de authorId incorrecto , debe ser un numero entero y positivo'})}

            // Verifica que author_id exista antes de actualizar el post.
            const author = await getServiceAuthorId(author_id)
            if(!author){ 
                return res.status(400).json({error: 'El author_id no existe'})}}

        if(published !== undefined && typeof published !== 'boolean'){
            return res.status(400).json({error:'published debe ser true o false'})}

        const updatePost = await putServicePost(title,content,author_id,published,req.validatedId)
        if (!updatePost){
            return res.status(404).json({error:"el post no existe"})}

        res.status(200).json(updatePost)

    } catch (error) {
        next(error)
    }
}

const deletePost = async(req,res,next) => {
    try {
        const deletePost = await deleteServicePost(req.validatedId)
        if(!deletePost){
            return res.status(404).json({error:'el post no existe'})}

        res.status(204).send()

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getPost,
    getPostId,
    getPostAuthorId,
    createPost,
    putPost,
    deletePost
}