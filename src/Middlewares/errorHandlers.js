const errorHandler = (error, req, res, next) => {
    console.error(error)

    res.status(500).json({error: "Error inesperado del servidor",})
}

module.exports = errorHandler