// importamos los servicios
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

// exportamos los controladores
module.exports = {
    getPost,
    getPostId,
    getPostAuthorId
}