const {
    getServiceAuthors,
    getServiceAuthorId,
    postServiceAuthor,
    putServiceAuthor,
    deleteServiceAuthor
    } = require('../Services/serviceAuthors')

const {
    validateName,
    validateEmail,
    validateExists
    } = require('../Utils/validations')

const {createError} = require('../Utils/createErrors')

const getAuthors = async (req,res,next) =>{
    try {
        const authors = await getServiceAuthors()
        res.status(200).json(authors)

    } catch (error) {
        next(error)}
}

const getAuthorId = async(req,res,next) => {
    try { 
        const author = await getServiceAuthorId(req.validatedId)

// errorExists recibe como segundo parametro el mensaje del error
        const errorAuthorExists = validateExists(author,'Autor no encontrado')
        if (errorAuthorExists){
            return next(errorAuthorExists)
        }

        res.status(200).json(author)
        
    } catch (error) {
        next(error)
    }
}

const postAuthor = async(req,res,next) => {
    try {
        const {name,email,bio} = req.body

// validateName recibe como segundo parametro si tiene que ser obligatorio true si no false
        const errorName = validateName(name,true)
        if (errorName){
            return next(createError(errorName,400))
        }

// validateEmail recibe como segundo parametro si tiene que ser obligatorio true si no false
        const errorEmail = validateEmail(email,true)
        if(errorEmail){
            return next(createError(errorEmail,400))
        }

        const newAuthor = await postServiceAuthor(name,email,bio)
        res.status(201).json(newAuthor)

    } catch (error) {
        if(error.code === "23505"){
            error.message = 'el email ya esta siendo utilizado'
            error.status = 409 
            return next(error)
        }
        next(error)
    }
}

const putAuthor = async(req,res,next) =>{
    try {
        if (Object.keys(req.body).length === 0){
            return next(createError('El body no puede estar vacio',400))
        }

        const {name,email,bio} = req.body

        const errorName = validateName(name,false)
        if(errorName){
            return next(createError(errorName,400))
        }

        const errorEmail = validateEmail(email,false)
        if(errorEmail){
            return next(createError(errorEmail,400))
        }

        const updateAuthor = await putServiceAuthor(req.validatedId,name,email,bio)

        const errorAuthorExists = validateExists(updateAuthor,'Autor no encontrado')
        if(errorAuthorExists){
            return next(errorAuthorExists)
        }

        res.status(200).json(updateAuthor)

    } catch (error) {
        if(error.code === "23505"){
            error.message = 'el email ya esta siendo utilizado'
            error.status = 409 
            return next(error)
        }
        next(error)}
}


const deleteAuthor = async(req,res,next) => {
    try {
        const deleteAuthor = await deleteServiceAuthor(req.validatedId)
        const errorAuthorExists = validateExists(deleteAuthor,'Autor no encontrado')
        if (errorAuthorExists){
            return next(errorAuthorExists)}
        
        res.status(204).send()

    } catch (error) {
        next(error)
    }
}


module.exports = {
    getAuthors,
    getAuthorId,
    postAuthor,
    putAuthor,
    deleteAuthor
}
