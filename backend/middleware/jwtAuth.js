const jwt = require('jsonwebtoken');
require("dotenv").config();

function generateToken(payload) {
  return jwt.sign({algo:payload},"shhh", { expiresIn: '1h' }); 
}

function verifyToken(req, res, next) {
  const token = req.header('Authorization');
    console.log("ACAESTOY");
  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido' });
    }
    req.user = user;
    next();
  });
}

module.exports = {
  generateToken,
  verifyToken,
};