
//#region Author
const validateAuthorBody = (req, res, next) => {
const { name, email, bio } = req.body || {};

  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ 
        status: 400, 
        message: "The author's name is required and cannot be empty." 
    });
  }

  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({
        status: 400, 
        message: 'Author email is required or is not valid' 
    });
  }

  if (typeof bio !== 'string' || bio.trim().length === 0) {
    return res.status(400).json({ 
        status: 400, 
        message: 'Author bio must be text and cannot be empty.' 
    });
  }

  next();
};
//#end region

//#region Post
const validatePostCreateBody = (req, res, next) => {
  const { author_id, title, content, published } = req.body || {};

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({
      status: 400,
      message: 'The post title is required and cannot be empty.',
    });
  }

  if (typeof content !== 'string' || content.trim() === '') {
    return res.status(400).json({
      status: 400,
      message: 'The post content is required and cannot be empty.',
    });
  }

  const parsedAuthorId = Number(author_id);
  if (!Number.isInteger(parsedAuthorId) || parsedAuthorId <= 0) {
    return res.status(400).json({
      status: 400,
      message: 'The post author_id must be a valid positive integer.',
    });
  }
  req.body.author_id = parsedAuthorId;

  if (published !== undefined && typeof published !== 'boolean') {
    return res.status(400).json({
      status: 400,
      message: 'The published field must be a boolean.',
    });
  }

  
  next();
};


const validatePostUpdateBody = (req, res, next) => {
  const { title, content, published } = req.body || {};

  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    return res.status(400).json({
      status: 400,
      message: 'The post title cannot be empty.',
    });
  }

  if (content !== undefined && (typeof content !== 'string' || content.trim() === '')) {
    return res.status(400).json({
      status: 400,
      message: 'The post content cannot be empty.',
    });
  }

  if (published !== undefined && typeof published !== 'boolean') {
    return res.status(400).json({
      status: 400,
      message: 'The published field must be a boolean.',
    });
  }

  next();
};



//#endregion


module.exports = {
  validateAuthorBody,
  validatePostCreateBody,
  validatePostUpdateBody
};
