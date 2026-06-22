
const {
    getServicePosts,
    getServicePostId,
    getServicePostAuthorId,
    postServicePost,
    putServicePost,
    deleteServicePost
} = require('../Services/servicePosts')

const{
    validateExists,
    validateTitle,
    validateContent,
    validateAuthorId,
    validatePublished
}=require('../Utils/validations')

const {createError} = require('../Utils/createErrors')
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

        const errorPostExists = validateExists(post,'Post no encontrado')
        if(errorPostExists){
            return next(errorPostExists)
        }
        
        res.status(200).json(post)

    } catch (error) {
        next(error)
    }
}

const getPostAuthorId = async(req,res,next) => {
    try {
        const post = await getServicePostAuthorId (req.validatedAuthorId)

        if (post.length === 0 ){
            return next(createError('Post no encontrado',404))
        }
        res.status(200).json(post)

    } catch (error) {
        next(error)
    }
}

const createPost = async(req,res,next) => {
    try {
        const {title,content,author_id} = req.body

//errorTitle recibe como segundo parametro si es obligatorio true o no false el titulo
        const errorTitle = validateTitle(title,true)
        if(errorTitle){
            return next(createError(errorTitle,400))
        }

//errorContent recibe como segundo parametro si es obligatorio true o no false el contenido
        const errorContent = validateContent(content,true)
        if(errorContent){
            return next(createError(errorContent,400))
        }

//errorAuthorId recibe como segundo parametro si es obligatorio true o no false el author_id
        const errorAuthorId = validateAuthorId(author_id,true)
        if(errorAuthorId){
            return next(createError(errorAuthorId,400))
        }

// Verifica que author_id exista antes de crear el post.
        const author = await getServiceAuthorId(author_id)
        const errorAuthorExists = validateExists(author,'El author_id no existe')
        if(errorAuthorExists){
            return next(errorAuthorExists)
        }
        
        let {published} = req.body
        const errorPublished = validatePublished(published)
        if(errorPublished){
            return next(createError(errorPublished,400))
        }
        if(published === undefined){
            published = false}

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
                return res.status(400).json({error:'Valor de author_id incorrecto , debe ser un numero entero y positivo'})}

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