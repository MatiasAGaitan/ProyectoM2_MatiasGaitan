// importo los services de autores
const {
    getServiceAuthors,
    getServiceAuthorId,
    postServiceAuthor,
    putServiceAuthor,
    deleteServiceAuthor
    } = require('../Services/serviceAuthors')

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
        if (!author){
            return res.status(404).json({error:'Autor no encontrado'})}
        res.status(200).json(author)
        
    } catch (error) {
        next(error)
    }
}

const postAuthor = async(req,res,next) => {
    try {
        const {name,email,bio} = req.body
        if (!name || !name.trim()){
            return res.status(400).json({error:'el nombre es obligatorio y no puede estar vacio'})}

        if(!email || !email.trim()){
            return res.status(400).json({error:'el email es obligatorio y no puede estar vacio'})}

        const newAuthor = await postServiceAuthor(name,email,bio)
        res.status(201).json(newAuthor)

    } catch (error) {
        if(error.code === "23505"){
            return res.status(409).json({error:'el email ya esta siendo utilizado'})}   
        next(error)
    }

}

const putAuthor = async(req,res,next) =>{
    try {
        if (Object.keys(req.body).length === 0){
            return res.status(400).json({error: 'el body no puede estar vacio'})}

        const {name,email,bio} = req.body
        if (name !== undefined){
            if (!name || !name.trim()){
                return res.status(400).json({error:'el nombre es obligatorio y no puede estar vacio'})}}

        if (email !== undefined){
            if(!email || !email.trim()){
                return res.status(400).json({error:'el email es obligatorio y no puede estar vacio'}) }}

        const updateAuthor = await putServiceAuthor(req.validatedId,name,email,bio)
        if (!updateAuthor){return res.status(404).json({error:'Autor no encontrado'})}
        res.status(200).json(updateAuthor)

    } catch (error) {
        if(error.code === "23505"){
            return res.status(409).json({error:'el email ya esta siendo utilizado'})}   

        next(error)
    }
}

const deleteAuthor = async(req,res,next) => {
    try {
        const deleteAuthor = await deleteServiceAuthor(req.validatedId)
        if (!deleteAuthor){
            return res.status(404).json({error:'Autor no encontrado'})}
        
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
