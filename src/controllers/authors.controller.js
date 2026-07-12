const { getAuthorsService, getAuthorByIdService } = require("../services/authors.service")

const getWelcomeController = (req, res, next) => {
  try {
    res.status(200).json({
      message: 'server is running ok'
    })
  } catch (error) {
    next(error)
  }
}

const getAuthorsController = async (req, res, next)=> {
 try {
    const authors = await getAuthorsService()
    res.status(200).json({
      message: 'Authors found',
      data: authors
    })
  } catch (error) {
      next(error)
  }

}

const getAuthorByIdController = async (req, res, next) => {
  try {
      const { id } = req.params
      const author = await getAuthorByIdService(id)
      res.status(200).json({
        msg: 'Author found',
        data: author
      })
    } catch (error) {
      next(error)
    }
}

module.exports = {
  getWelcomeController,
  getAuthorsController,
  getAuthorByIdController
}