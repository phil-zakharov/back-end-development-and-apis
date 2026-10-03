export function notFoundHandler(req, res, next) {
  const error = new Error(`error on ${req.originalUrl}`)
  error.status = 404;
  next(error)
} 

export function finalErrorHandler(err, req, res, next) {
  const status = err.status || 500;
  console.log(err.message)
  res.status(status).json({
    error: true,
    status,
    message: status === 500 ? "Internal Server Error (Check Server Logs)" : err.message
  })
}