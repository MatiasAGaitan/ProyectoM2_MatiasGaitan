const {createError} = require('../Utils/createErrors')

// Valida ids de rutas y guarda el valor numerico en req para reutilizarlo en controllers.
const validateId = (req,res,next) => {
    const id = Number(req.params.id)
    if(isNaN(id)){
        return next(createError('El id debe ser un numero',400))
    }
    if(!Number.isInteger(id)){
        return next(createError('El id debe ser un numero entero',400))
    }
    if (id <= 0 ){ 
        return next(createError('El id debe ser mayor a 0',400))
    }

    req.validatedId = id
    next()
}

const validateAuthorId = (req,res,next) => {
    const id = Number(req.params.author_id)
    if(isNaN(id)){
        return next(createError('El author_id debe ser un numero',400))
    }
    if(!Number.isInteger(id)){
        return next(createError('El author_id debe ser un numero entero',400))
    }
    if (id <= 0 ){ 
        return next(createError('El author_id debe ser mayor a 0',400))
    }
    
    req.validatedAuthorId = id
    next()
}


module.exports = {
    validateId,
    validateAuthorId
}