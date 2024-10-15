import { Request, Response } from "express";
import { User } from "../db/entity/User";
import { AppDataSource } from "../dataSourse";
import { generateAccessToken, handleError, validPassword, findUser, addUserInDb } from "./appControllers";
const userRepository = AppDataSource.getRepository(User);
require('dotenv').config();

export const registration = async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(404);

  try {
    const user = new User();
    addUserInDb(user, req.body);
    await userRepository.save(user);

    const token = generateAccessToken({ id: req.body.id });
    console.log("user are addited");
    res.json({ user, token });
  }
  catch (err) {
    handleError(res, err, "Error while registrate user");
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await findUser({ email: email });
    if (!user) return res.status(404).send("User not found");

    const [salt, userHashPassword] = user.password.split('//');
    const isPasswordValid = validPassword(password, userHashPassword, salt);

    if (isPasswordValid == false) return res.status(400).send("Wrong password");

    const token = generateAccessToken({ id: req.body.id });
    res.json({ user, token });

  }
  catch (err) {
    handleError(res, err, "Error while login user");
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(404);

  try {
    const user = await findUser({ id: req.params.id });
    if (!user) return res.status(404).send("User not found");

    return await userRepository.remove(user);
  }
  catch (err) {
    handleError(res, err, "Error while delete user");
  }
}

export const updateUser = async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(404);
  try {
    const user = await findUser({ id: req.params.id });
    if (!user) return res.status(404).send("User not found");

    addUserInDb(user, req.body);
    await userRepository.save(user);

    console.log("user are changed");
    res.json(user);
  }
  catch (err) {
    handleError(res, err, "Error while update user");
  }
}

export const getUser = async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(404);

  try {
    const user = await findUser({ id: req.params.id });
    if (!user) return res.status(404).send("User not found");

    const visibleParamsOfUser = {
      name: user.fullName,
      email: user.email,
      dateOfBirth: user.Dob
    }
    res.json(visibleParamsOfUser);

  }
  catch (err) {
    handleError(res, err, "Error while get user");
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(404);

  try {
    const users = await userRepository.find();
    if (!users || users.length === 0) {
      return res.status(404).send("Users not found");
    }

    const visibleParamsOfUsers = users.map(user => (
      {
        name: user.fullName,
        email: user.email,
        dateOfBirth: user.Dob
      }));

    res.json(visibleParamsOfUsers);
  }
  catch (err) {
    handleError(res, err, "Error while get user");
  }
}


