const {createError} = require('./createErrors')

// Ejecuta el validador pasando el valor del body y si el campo es obligatorio según el endpoint.
const validateName = (name,required) => {
    if (name === undefined){
        if(required){
            return 'El nombre es obligatorio'
        }
        return null
    }
    if (typeof name !== 'string'){ return 'El nombre debe ser texto'}
    if (!name){ return 'El nombre no puede estar vacio'}
    if (!name.trim()){ return 'El nombre no puede ser espacios vacios '}

    return null
}

const validateEmail = (email,required) => {
    if(email === undefined){
        if(required){
            return 'El email es obligatorio'
        }

        return null
    }
    if(typeof email !== "string"){ return 'El email debe ser texto'}
    if(!email){ return 'El email no puede estar vacio'}
    if(!email.trim()){ return 'El email no puede ser espacios vacios'}

// Expresión regular simple para validar formato básico de email: texto@dominio.extensión
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {return "El email debe tener un formato valido"}

    return null
}

const validateExists = (element,message) => {
    if (!element){
        return createError(message,404)
    }

    return null
}

const validateTitle = (title,required) => {
    if(title === undefined){
        if(required){
            return 'El titulo es obligatorio'
        }
        return null
    }
    if(!title){return 'El titulo no puede estar vacio'}
    if(!title.trim()){return 'El titulo no puede ser espacios vacio'}
    if(title.trim().length < 3){return 'El titulo debe tener al menos 3 caracteres'}

    return null
}

const validateContent = (content,required) => {
    if(content === undefined){
        if(required){
            return 'El contenido es obligatorio'
        }
        return null
    }
    if(!content){return 'El contenido no puede estar vacio'}
    if(!content.trim()){return 'El contenido no puede ser espacios vacio'}
    if(content.trim().length <10){return 'El contenido debe tener al menos 10 caracteres'}

    return null
}

const validateAuthorId = (author_id,required) => {
    if(author_id === undefined){
        if(required){
            return 'El author_id es obligatorio'
        }
        return null
    }
    if(isNaN(author_id)){return 'El author_id debe ser un numero'}
    if(!Number.isInteger(author_id)){return 'El author_id debe ser un numero entero'}
    if (author_id <= 0 ){ return 'El author_id debe ser mayor a 0'}

    return null
}

const validatePublished = (published) => {
    if(published !== undefined && typeof published !== 'boolean'){return 'published debe ser true o false'}
    
    return null
}

module.exports = {
    validateName,
    validateEmail,
    validateExists,
    validateTitle,
    validateContent,
    validateAuthorId,
    validatePublished
}
