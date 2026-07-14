const requestLogger = (req, res, next) => {
  const startedAt = process.hrtime.bigint()
  const requestTime = new Date().toISOString()

  res.on('finish', () => {
    const finishedAt = process.hrtime.bigint()
    const responseTimeMs = Number(finishedAt - startedAt) / 1_000_000

    console.log('[RESPONSE]', {
      time: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTimeMs: Number(responseTimeMs.toFixed(2))
    })
  })

  next()

}

const errorHandler = (err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    status: err.statusCode,
    message: 'Error processing the request',
    errorMsg: err.message || 'Internal server error'
  });
};



module.exports = {
  requestLogger,
  errorHandler
}