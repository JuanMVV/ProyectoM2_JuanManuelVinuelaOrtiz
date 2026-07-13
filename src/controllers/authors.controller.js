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
        message: 'Author found',
        data: author
      })
    } catch (error) {
      next(error)
    }
}

// POST /authors
const createNewAuthorController = async (req, res, next) => {
  try {   
    const newAurhor = await createNewAuthorService(req.body)
    res.status(201).json({ 
      message: 'Author created successfully.',
      status: 201          
    })

    } catch (error) {
      next(error)
    }
}

// POST(update) /authors/:id



const updateAuthorController = async(req, res, next) => {
  const authorId = Number(req.params.id ?? req.body?.id);
    if (!Number.isInteger(authorId)) {
        return res.status(400).json({
          status: 400, 
          message: 'Invalid author ID.'
        });
    }
  
  try{
    const updatedAuthor = await updateAuthorService(authorId, req.body);
      if (updatedAuthor) {
            res.status(200).json({ 
              status: 200, 
              message: 'The author was updated successfully.', 
              data: updatedAuthor 
            });
        } else {
            res.status(404).json({ 
              status: 404, 
              message: `Author with ID ${authorId} not found.` 
            });
        }

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