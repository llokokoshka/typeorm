import * as crypto from "crypto";
import * as jwt from 'jsonwebtoken';
import  * as dotenv from "dotenv"
dotenv.config();


export function generateAccessToken(id:Object) {
  return jwt.sign(id, process.env.TOKEN_SECRET, { expiresIn: '1h' });
}

export function generatePassword(password: string) {
  const salt = crypto.randomBytes(32).toString('hex');
  const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return {
    salt: salt,
    hash: genHash
  };
}

export function validPassword(password: string, hash: string, salt: string) {
  const checkHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === checkHash;
}