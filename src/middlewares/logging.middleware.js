const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'mysecretkey');
    const id = decodedToken.id;
    
    req.body.userId = id
    next()
  } catch (err) {
    res.status(401).json({
      error: 'invalid request! ' + err 
    });
  }
};