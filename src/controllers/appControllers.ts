import { Response } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../index";

const crypto = require("crypto")
const jwt = require('jsonwebtoken');
const userRepository = AppDataSource.getRepository(User);

require('dotenv').config();

export function generateAccessToken(id:object) {
  return jwt.sign(id, process.env.TOKEN_SECRET, { expiresIn: '1h' });
}

export function generatePassword(password: string) {
  const salt = crypto.randomBytes(32).toString('hex')
  const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return {
    salt: salt,
    hash: genHash
  }
}

export function validPassword(password: string, hash: string, salt: string) {
  const checkHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return hash === checkHash
}

export async function findUserById(id:string) {
  return await userRepository.findOneById(id);
}

export function handleError(res: Response, err:any, message:string) {
  console.error(err);
  res.status(500).send(message);
}

export function addUserInDb(userFromDb, newUserInfo){

  const { fullName, email, password, Dob } = newUserInfo;
  const hashPass = generatePassword(password);

  userFromDb.fullName = fullName;
  userFromDb.email = email;
  userFromDb.Dob = Dob;
  userFromDb.password = hashPass.salt + '//' + hashPass.hash;

  return userFromDb;
}