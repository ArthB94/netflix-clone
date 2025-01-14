import jwt from 'jsonwebtoken';

// Middleware pour vérifier la validité du token
const authenticateToken = (req, res, next) => {
  console.log('authenticateToken');
  const token = req.headers['authorization']?.split(' ')[1]; // "Bearer token"

  if (!token) {
    console.log('No token');
    return res.status(401).json({ ok: false, errorMessage: 'Authentication required' });
  }

  // Vérification du token (en utilisant le secret de ton environnement)
  jwt.verify(token, 'my_secret', (err, user) => {
    if (err) {
      console.log('Invalid token:', err);
      return res.status(403).json({ ok: false, errorMessage: 'Invalid token' });
    }
    req.user = user; // Ajoute les informations de l'utilisateur à la requête
    next(); // Passe au middleware suivant ou à la route
  });
};

const generateAccessToken = (user) => {
  const token =jwt
  .sign(user, 'my_secret', { expiresIn: '1d' });
  console.log('Token generated:', token);
  return token;
}

export {
  authenticateToken,
  generateAccessToken
};
