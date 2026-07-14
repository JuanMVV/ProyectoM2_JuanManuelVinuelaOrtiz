const { getAuthorsService, getAuthorByIdService, createNewAuthorService, updateAuthorService, deleteAuthorService} = require("../services/authors.service")


// GET all Authors
const getAuthorsController = async (req, res, next) => {
  try {
    const authors = await getAuthorsService()
    res.status(200).json({
      message: authors.length ? 'Authors retrieved successfully' : 'No authors found',
      data: authors
  })

  } catch (error) {
    next(error)
  }
}

// GET Author by Id
const getAuthorByIdController = async (req, res, next) => {
  try {
      const { id } = req.params
      const author = await getAuthorByIdService(id)
       if (author.length === 0) {
      return res.status(404).json({
        message: `Author with id ${id} not found`,
        data: []
      })
    }
    return res.status(200).json({
      message: 'Author retrieved successfully',
      data: author[0]
    })
      
      
    } catch (error) {
      next(error)
    }
}

// POST /authors
const createNewAuthorController = async (req, res, next) => {
  try {   
    await createNewAuthorService(req.body)
    res.status(201).json({ 
      status: 201,
      message: 'Author created successfully.'               
    })
    } catch (error) {
      next(error)
    }
}

// PUT Update /authors/:id
const updateAuthorController = async (req, res, next) => {
  try {
    const authorId = Number(req.params.id ?? req.body?.id);
    const updatedAuthor = await updateAuthorService(authorId, req.body);
    return res.status(200).json({
      status: 200,
      message: 'The author was updated successfully.',
      data: updatedAuthor
    });
  } catch (error) {
    next(error);
  }
};


// DELETE
const deleteAuthorsController = async (req, res, next) => {
  try {  
      const authorId = Number(req.params.id);
        if (!Number.isInteger(authorId)) {
            return res.status(400).json({ 
              status: 400, 
              message: 'Invalid author ID.'
            });
        }    
        const deletedAuthor = await deleteAuthorService(authorId);              
        if (deletedAuthor) {
            res.status(200).json({ 
              status: 200, 
              message: 'Author deleted successfully.', 
              data: null 
            });
        } 
        else {
            res.status(404).json({ 
              status: 404, 
              error: `Author with ID = ${authorId} not found.`
            });
        }
    } catch (error) {
        next(error)     
    }
};



module.exports = {
  getAuthorsController,
  getAuthorByIdController,
  createNewAuthorController,
  updateAuthorController,
  deleteAuthorsController
}