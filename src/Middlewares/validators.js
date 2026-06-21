const validateId = (req,res,next) => {
    const id = Number(req.params.id)
    if(isNaN(id) || !Number.isInteger(id) || id <= 0 ){
        return res.status(400).json({error:'Valor de id incorrecto , debe ser un numero entero y positivo'})}
    
    req.validatedId = id
    next()
}

const validateAuthorId = (req,res,next) => {
    const id = Number(req.params.authorId)
    if(isNaN(id) || !Number.isInteger(id) || id <= 0 ){
        return res.status(400).json({error:'Valor de AuthorId incorrecto , debe ser un numero entero y positivo'})}
    
    req.validatedAuthorId = id
    next()
}


module.exports = {
    validateId,
    validateAuthorId
}