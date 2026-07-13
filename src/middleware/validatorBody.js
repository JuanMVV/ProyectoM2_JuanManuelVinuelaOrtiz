
//#region Author
const validateAuthorBody = (req, res, next) => {
const { name, email, bio } = req.body || {};

  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ 
        status: 400, 
        message: 'Author name is required' 
    });
  }

  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({
        status: 400, 
        message: 'Author email is not valid' 
    });
  }

  if (bio !== undefined && typeof bio !== 'string') {
    return res.status(400).json({ 
        status: 400, 
        message: 'Author bio must be text' 
    });
  }

  next();
};
//#end region



module.exports = {
  validateAuthorBody
};
