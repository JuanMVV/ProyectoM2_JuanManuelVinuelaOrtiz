const { getAuthorsService, getAuthorByIdService, createNewAuthorService, updateAuthorService} = require("../services/authors.service")


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

// POST /authors
const createNewAuthorController = async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;
    await createNewAuthorService(name, email, bio)
    res.status(201).json({ 
      msg: 'Author create sucessful'    
    })

    } catch (error) {
      next(error)
    }
}

// POST(update) /authors/:id
const updateAuthorController = async(req, res, next) => {
  try{
    const { id } = req.params;
    const { name, email, bio} = req.body;
    const resp = await updateAuthorService(id, name, email, bio);
    res.status(201).json({
      msg: 'Author update sucessful',
      data: resp
    })

  } catch (error) {
      next(error)
    }


}


module.exports = {
  getAuthorsController,
  getAuthorByIdController,
  createNewAuthorController,
  updateAuthorController
}