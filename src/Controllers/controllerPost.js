
const { error } = require('node:console')
const {
    getServicePosts,
    getServicePostId,
    getServicePostAuthorId
} = require('../Services/servicePosts')

const getPost = async (req,res,next) =>{
    try {
        const posts = await getServicePosts()
            res.json(posts)
    } catch (error) {
        next(error)}
}

const getPostId = async(req,res,next) => {
    try {
        const id = Number(req.params.id)
        if(isNaN(id) || !Number.isInteger(id) || id <= 0 ){
            return res.status(400).json({error:'Valor de id incorrecto , debe ser un numero entero y positivo'})}  

        const post = await getServicePostId (id)

        if(!post){return res.status(404).json({error:'Post no encontrado'})}
        res.status(200).json(post)

    } catch (error) {
        next(error)
    }
}

const getPostAuthorId = async(req,res,next) => {
    try {
        const authorId = Number(req.params.authorId)
        if(isNaN(authorId) || !Number.isInteger(authorId) || authorId <= 0){
            return res.status(400).json({error:'valor de AuthorId incorrecto, debe ser un numero entero y positivo'})}
        
        const post = await getServicePostAuthorId (authorId)

        if (post.length === 0 ){return res.status(404).json({error:'Post no encontrado'})}
        res.status(200).json(post)

    } catch (error) {
        next(error)
    }
}


module.exports = {
    getPost,
    getPostId,
    getPostAuthorId
}