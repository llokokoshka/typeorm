import { Response } from "express";
import { User } from "../db/entity/User";
import { AppDataSource } from "../db/dataSource";
import * as crypto from "crypto";
import * as jwt from 'jsonwebtoken';
import  * as dotenv from "dotenv"
dotenv.config();

const userRepository = AppDataSource.getRepository(User);


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

export async function findUser(id:number) {
  console.log(id);
  return await userRepository.findOneBy({ id: id });
}

export function handleError(res: Response, err:any, message:string) {
  console.error(err);
  res.status(500).send(message);
}

export function addUserInDb(userFromDb:User, newUserInfo:User){

  const { fullName, email, password, Dob } = newUserInfo;
  const hashPass = generatePassword(password);

  userFromDb.fullName = fullName;
  userFromDb.email = email;
  userFromDb.Dob = Dob;
  userFromDb.password = hashPass.salt + '//' + hashPass.hash;

  return userFromDb;
}