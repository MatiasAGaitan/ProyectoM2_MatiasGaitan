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
    if (!name.trim()){ return 'El nombre no puede ser espacios vacios'}

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

// Expresion regular simple para validar formato basico de email: texto@dominio.extensión
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
    if(typeof title !== 'string'){ return 'El titulo debe ser texto'}
    if(!title){return 'El titulo no puede estar vacio'}
    if(!title.trim()){return 'El titulo no puede ser espacios vacios'}
    if(title.trim().length < 3){return 'El titulo debe tener por lo menos 3 caracteres'}

    return null
}

const validateContent = (content,required) => {
    if(content === undefined){
        if(required){
            return 'El contenido es obligatorio'
        }
        return null
    }
    if(typeof content !== 'string'){return 'El contenido debe ser texto'}
    if(!content){return 'El contenido no puede estar vacio'}
    if(!content.trim()){return 'El contenido no puede ser espacios vacios'}
    if(content.trim().length <10){return 'El contenido debe tener por lo menos 10 caracteres'}

    return null
}

const validateAuthorId = (author_id,required) => {
    if(author_id === undefined){
        if(required){
            return 'El author_id es obligatorio'
        }
        return null
    }
    if(typeof author_id !== 'number'){return 'El author_id debe ser un numero'}
    if(!Number.isInteger(author_id)){return 'El author_id debe ser un numero entero'}
    if (author_id <= 0 ){ return 'El author_id debe ser mayor a 0'}

    return null
}

const validatePublished = (published) => {
    if(published !== undefined && typeof published !== 'boolean'){return 'published debe ser true o false (boolean)'}
    
    return null
}

const validateCommentContent = (comment_content,required) => {
    if(comment_content === undefined){
        if(required){
            return 'El comment_content es obligatorio'
        }
        return null
    }
    if(typeof comment_content !== 'string'){return 'El comment_content debe ser un texto'}
    if(!comment_content){return 'El comment_content no puede estar vacio'}
    if(!comment_content.trim()){return 'El comment_content no puede ser espacios vacios'}
    if(comment_content.trim().length <10){return 'El comment_content debe tener por lo menos 10 caracteres'}
    
    return null
}

const validatePostId = (post_id,required) => {
    if(post_id === undefined){
        if(required){
            return 'El post_id es obligatorio'
        }
        return null
    }
    if(typeof post_id !== 'number'){return 'El post_id debe ser un numero'}
    if(!Number.isInteger(post_id)){return 'El post_id debe ser un numero entero'}
    if (post_id <= 0 ){ return 'El post_id debe ser mayor a 0'}

    return null
}

module.exports = {
    validateName,
    validateEmail,
    validateExists,
    validateTitle,
    validateContent,
    validateAuthorId,
    validatePublished,
    validateCommentContent,
    validatePostId
}
