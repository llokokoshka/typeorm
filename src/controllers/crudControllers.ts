import { Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../index";
import { generateAccessToken, handleError, validPassword, findUserById, addUserInDb } from "./appControllers";
const userRepository = AppDataSource.getRepository(User);
require('dotenv').config();

export const registration = async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(400);

  try {
    const user = new User();
    addUserInDb(user, req.body);
    await userRepository.save(user);

    const token = generateAccessToken({ id: req.body.id });
    console.log("user are addited");
    res.json({ user, token });
  }
  catch (err) {
    handleError(res, err, "Error while loggin user");
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findOneBy({ email: email });

    if (!user) return res.status(500).send("Error while loggin user");
    const [salt, userHashPassword] = user.password.split('//');

    const isPasswordValid = validPassword(password, userHashPassword, salt);

    if (isPasswordValid == false) return res.status(500).send("Wrong password");

    const token = generateAccessToken({ id: req.body.id });
    res.json({ user, token });

  }
  catch (err) {
    handleError(res, err, "Error while loggin user");
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(400);
  try {
    const user = await findUserById(req.params.id);
    if (!user) return res.status(500).send("User not found");
    return await userRepository.remove(user);
  }
  catch (err) {
    handleError(res, err, "Error while loggin user");
  }
}

export const updateUser = async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(400);
  try {
    const user = await findUserById(req.params.id);

    if (!user) return res.status(500).send("User not found");

    addUserInDb(user, req.body);

    await userRepository.save(user);

    console.log("user are changed");
    res.json(user);
  }
  catch (err) {
    handleError(res, err, "Error while loggin user");
  }
}

export const getUser = async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(400);
  try {
    const user = await findUserById(req.params.id);
    if (!user) return res.status(500).send("User not found");

    const visibleParamsOfUser = {
      name: user.fullName,
      email: user.email,
      dateOfBirth: user.Dob
    }
    res.json(visibleParamsOfUser);

  }
  catch (err) {
    handleError(res, err, "Error while loggin user");
  }
}

