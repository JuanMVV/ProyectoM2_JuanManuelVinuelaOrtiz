const welcomeController = (req, res, next) => {
  try {
    res.status(200).json({
      status: 200,
      message: 'Server is running ok'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
    welcomeController
}