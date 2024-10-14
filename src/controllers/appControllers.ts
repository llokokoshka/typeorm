require('dotenv').config();
const jwt = require('jsonwebtoken');
import { Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../index";
const crypto = require("crypto")

const userRepository = AppDataSource.getRepository(User);

export function generateAccessToken(id) {
  return jwt.sign(id, process.env.TOKEN_SECRET, { expiresIn: '1h' });
}

function generatePassword(password: string) {
  const salt = crypto.randomBytes(32).toString('hex')
  const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return {
    salt: salt,
    hash: genHash
  }
}

function validPassword(password, hash, salt) {
  const checkHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return hash === checkHash
}


export const registration = async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(400);
  try {
    const { fullName, email, password, Dob } = req.body;
    const hashPass = generatePassword(password);
    const user = new User();
    user.fullName = fullName;
    user.email = email;
    user.Dob = Dob;
    user.password = hashPass.salt + '//' + hashPass.hash;
    await userRepository.save(user);
    const token = generateAccessToken({ id: req.body.id });
    console.log("user are addited");
    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while registering user");
  }
}
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findOneBy({ email: email });
    if (!user) return;
    const salt = user.password.split('//')[0];
    const userHashPassword = user.password.split('//')[1];
    const checkPass = validPassword(password, salt, userHashPassword);
    if (checkPass) {
      const token = generateAccessToken({ id: req.body.id });
      res.json({ user, token });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while loggin user");
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(400);
  try {
    const user = await userRepository.findOneById(req.params.id);
    if (!user) return res.status(500).send("User not found");
    return await userRepository.remove(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while registering user");
  }
}

export const updateUser = async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(400);
  try {
    const user = await userRepository.findOneById(req.params.id);
    if (!user) return res.status(500).send("User not found");
    const { name, email, password, Dob } = req.body;
    const hashPass = generatePassword(password);
    user.fullName = name;
    user.email = email;
    user.Dob = Dob;
    user.password = hashPass.salt + '//' + hashPass.hash;
    await userRepository.save(user);
    console.log("user are changed");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while registering user");
  }
}

export const getUser = async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(400);
  try {
    const user = await userRepository.findOneById(req.params.id);
    if (!user) return res.status(500).send("User not found");
    const visibleParamsOfUser = {
      name: user.fullName,
      email: user.email,
      dateOfBirth: user.Dob
    }
    res.json(visibleParamsOfUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while registering user");
  }
}