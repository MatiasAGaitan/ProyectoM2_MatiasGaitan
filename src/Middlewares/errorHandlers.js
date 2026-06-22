const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500
    const message = err.message || "Error interno del servidor"
    
    console.error(`[ERROR] ${statusCode}: ${message}`)

    res.status(statusCode).json({
        error: message,
        status: statusCode
    })
}
module.exports = errorHandler