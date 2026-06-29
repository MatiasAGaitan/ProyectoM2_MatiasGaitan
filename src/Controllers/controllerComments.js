const {
    getServiceComments,
    getServiceCommentsId,
    postServiceComments,
    putServiceComments,
    deleteServiceComments
}= require('../Services/serviceComments')

const {getServiceAuthorId} = require('../Services/serviceAuthors')
const {getServicePostId} = require('../Services/servicePosts')
const {createError} = require('../Utils/createErrors')

const {
    validateExists,
    validateCommentContent,
    validateAuthorId,
    validatePostId
} = require('../Utils/validations')

const getComments = async (req,res,next) => {
    try {
        const comments = await getServiceComments()
        res.status(200).json(comments)

    } catch (error) {
        next(error)
    }
}

const getCommentsId = async (req,res,next) => {
    try {
        const comment = await getServiceCommentsId(req.validatedId)

        const errorCommentExists = validateExists(comment,'comment no encontrado')
        if(errorCommentExists){
            return next(errorCommentExists)
        }
        res.status(200).json(comment)
    } catch (error) {
        next(error)
    }
}

const postComments = async (req,res,next) => {
    try {
        const {comment_content,author_id, post_id} = req.body

        const errorCommentContent = validateCommentContent(comment_content,true)
        if(errorCommentContent){
            return next(createError(errorCommentContent,400))
        }

        const errorAuthorId = validateAuthorId(author_id,true)
        if(errorAuthorId){
            return next(createError(errorAuthorId,400))
        }

        const author = await getServiceAuthorId(author_id)
        const errorAuthorExists = validateExists(author,'El author_id no existe')
        if(errorAuthorExists){
            return next(errorAuthorExists)
        }

        const errorPostId = validatePostId(post_id,true)
        if(errorPostId){
            return next(createError(errorPostId,400))
        }

        const post = await getServicePostId(post_id)
        const errorPostExists = validateExists(post,'El post_id no existe')
        if(errorPostExists){
            return next(errorPostExists)
        }
        
        const newComment = await postServiceComments(comment_content,author_id,post_id)
        res.status(201).json(newComment)
    } catch (error) {
        next(error)
    }
}

const putComments = async (req,res,next) => {
    try {
        if (Object.keys(req.body).length === 0){
            return next(createError('El body no puede estar vacio',400))}

        const {comment_content,author_id, post_id} = req.body

        const errorCommentContent = validateCommentContent(comment_content,false)
        if(errorCommentContent){
            return next(createError(errorCommentContent,400))
        }

        const errorAuthorId = validateAuthorId(author_id,false)
        if(errorAuthorId){
            return next(createError(errorAuthorId,400))
        }
        if(author_id !== undefined){
            const author = await getServiceAuthorId(author_id)
            const errorAuthorExists = validateExists(author,'El author_id no existe')
            if(errorAuthorExists){
                return next(errorAuthorExists)
            }
        }
        const errorPostId = validatePostId(post_id,false)
        if(errorPostId){
            return next(createError(errorPostId,400))
        }

        if(post_id !== undefined){
            const post = await getServicePostId(post_id)
            const errorPostExists = validateExists(post,'El post_id no existe')
            if(errorPostExists){
                return next(errorPostExists)
            }
        }
        const putComment = await putServiceComments(comment_content,author_id,post_id,req.validatedId)

        const errorCommentExists = validateExists(putComment,'El comment que quiere actualizar no existe')
        if(errorCommentExists){
            return next(errorCommentExists)
        }

        res.status(200).json(putComment)        
    } catch (error) {
        next(error)
    }
}
const deleteComments = async (req,res,next) => {
    try {

    const deleteComment = await deleteServiceComments(req.validatedId)

    const errorCommentExists = validateExists(deleteComment,'El comment a eliminar no existe')
    if(errorCommentExists){
        return next(errorCommentExists)
    }
    res.status(204).send()        
    } catch (error) {
        next(error)
    }

}

module.exports = {
    getComments,
    getCommentsId,
    postComments,
    putComments,
    deleteComments
}