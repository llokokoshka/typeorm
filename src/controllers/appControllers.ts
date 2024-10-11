const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
import { Request, Response } from "express";
const bcrypt = require("bcrypt");
import { User } from "../entity/User";
import { AppDataSource } from "../index";
import {validate} from "../middleware/validate";
import userSchema from "../schemas/userSchema";

const userRepository = AppDataSource.getRepository(User);

export function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

export const registrate = async (req: Request, res: Response) => {
    if (!req.body) return res.sendStatus(400);
    try {
      await validate(userSchema);
      const token = generateAccessToken({ username: req.body.name });
      const salt = await bcrypt.genSalt(10);
      const name = req.body.name;
      const password = await bcrypt.hash(req.body.password, salt);
      const email = req.body.email
      const dob = req.body.dob;
      const user = new User();
      user.fullName = name;
      user.Email = email;
      user.Dob = dob;
      user.password = password;
      await userRepository.save(user);
      console.log("user are addited");
      res.redirect(`/user/${user.id}`);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error while registering user");
    }
}
export const login = async (req: Request, res: Response) => {
  try {
 
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while registering user");
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(400);
  try {
 
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while registering user");
  }
}

export const updateUser = async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(400);
  try {
 
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while registering user");
  }
}

export const getUser = async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(400);
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneById(req.params.id);
  
    res.render("userPage.hbs", {
      fullName: user.fullName,
      email: user.Email,
      dob: user.Dob
    });
 
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while registering user");
  }
}