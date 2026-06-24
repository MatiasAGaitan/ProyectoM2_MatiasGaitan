
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

//errorTitle recibe como segundo parametro si es obligatorio true de lo contrario false 
        const errorTitle = validateTitle(title,true)
        if(errorTitle){
            return next(createError(errorTitle,400))
        }

//errorContent recibe como segundo parametro si es obligatorio true de lo contrario false 
        const errorContent = validateContent(content,true)
        if(errorContent){
            return next(createError(errorContent,400))
        }

        let {published} = req.body
        const errorPublished = validatePublished(published)
        if(errorPublished){
            return next(createError(errorPublished,400))
        }
        if(published === undefined){
            published = false}

//errorAuthorId recibe como segundo parametro si es obligatorio true de lo contrario false 
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

        const newPost = await postServicePost(title,content,author_id,published)
        res.status(201).json(newPost)
        
    } catch (error) {
        next(error)
    }
}

const putPost = async(req,res,next) => {
    try {
        if (Object.keys(req.body).length === 0){
            return next(createError('El body no puede estar vacio',400))}

        const {title,content,author_id,published} = req.body

        const errorTitle = validateTitle(title,false)
        if(errorTitle){
            return next(createError(errorTitle,400))
        }
        
        const errorContent = validateContent(content,false)
        if(errorContent){
            return next(createError(errorContent,400))
        }

        const errorPublished = validatePublished(published)
        if(errorPublished){
            return next(createError(errorPublished,400))
        }

        const errorAuthorId = validateAuthorId(author_id,false)
        if(errorAuthorId){
            return next(createError(errorAuthorId,400))
        }

// Verifica que author_id exista antes de actualizar el post.
        if(author_id !== undefined){
            const author = await getServiceAuthorId(author_id)
            const errorAuthorExists = validateExists(author,'El author_id no existe')
            if(errorAuthorExists){
                return next(errorAuthorExists)}
            }

        const updatePost = await putServicePost(title,content,author_id,published,req.validatedId)
        const errorPostExists = validateExists(updatePost,"El post que quiere actualizar no existe")
        if (errorPostExists){
            return next(errorPostExists)
        }

        res.status(200).json(updatePost)

    } catch (error) {
        next(error)
    }
}

const deletePost = async(req,res,next) => {
    try {
        const deletePost = await deleteServicePost(req.validatedId)

        const errorPostExists = validateExists(deletePost,'El post que quiere eliminar no existe')
        if(errorPostExists){
            return next(errorPostExists)
        }

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