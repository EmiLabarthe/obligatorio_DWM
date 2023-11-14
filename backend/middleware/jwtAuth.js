const jwt = require('jsonwebtoken');
require("dotenv").config();

function generateToken(payload) {
  console.log(" process.env.JWT_SECRET; ",  process.env.JWT_SECRET)
  return jwt.sign({algo:payload}, process.env.JWT_SECRET, { algorithm: "HS256", expiresIn: '1h' }); 
}



function verifyToken(req, res, next) {
  //const token = req.headers.authorization?.split(" ")[1];
  const token = req.headers.authorization;
    console.log("ACAESTOY");
    console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("err: " , err )
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