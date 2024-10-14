require('dotenv').config();
const jwt = require('jsonwebtoken');
import { Request, Response } from "express";
const bcrypt = require("bcrypt");
import { User } from "../entity/User";
import { AppDataSource } from "../index";
import { validate } from "../middleware/validate";
import userSchema from "../schemas/userSchema";

const userRepository = AppDataSource.getRepository(User);

export function generateAccessToken(id) {
  return jwt.sign(id, process.env.TOKEN_SECRET, { expiresIn: '3h' });
}

export const registration = async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(400);
  try {
    await validate(userSchema);
    const salt = await bcrypt.genSalt(10);
    const { name, email, password, Dob } = req.body;
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new User();
    user.fullName = name;
    user.Email = email;
    user.Dob = Dob;
    user.password = passwordHash;
    await userRepository.save(user);
    const token = generateAccessToken({ id: req.body.id });
    console.log("user are addited");
    res.json({user, token});
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while registering user");
  }
}
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findOneBy({ Email: email });
    if (!user) return;
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        const token = generateAccessToken({ id: req.body.id });
        res.json({user, token});
      }
    });
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
    await validate(userSchema);
    const salt = await bcrypt.genSalt(10);
    const { name, email, password, Dob } = req.body;
    const passwordHash = await bcrypt.hash(password, salt);
    user.fullName = name;
    user.Email = email;
    user.Dob = Dob;
    user.password = passwordHash;
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
      email: user.Email,
      dateOfBirth: user.Dob
    }
    res.json(visibleParamsOfUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while registering user");
  }
}