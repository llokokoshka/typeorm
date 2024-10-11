const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

export function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}