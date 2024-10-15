import { Request, Response } from "express";
import { User } from "../db/entity/User";
import { AppDataSource } from "../db/dataSource";
import { generateAccessToken, handleError, validPassword, findUser, addUserInDb } from "./appControllers";
const userRepository = AppDataSource.getRepository(User);
import  * as dotenv from "dotenv"
dotenv.config();

export const registration = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.sendStatus(400); 
    return;
  }
  try {
    const user = new User();
    addUserInDb(user, req.body);
    await userRepository.save(user);

    const token = generateAccessToken({ id: user.id });
    console.log("user are addited");
    res.json({ user, token });
  }
  catch (err) {
    handleError(res, err, "Error while registrate user");
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send("Email and password are required");
      return;
    }

    const user = await userRepository.findOneBy({ email: email });
    if (!user){
      res.status(404).send("User not found");
      return;
    }

    const [salt, userHashPassword] = user.password.split('//');
    const isPasswordValid = validPassword(password, userHashPassword, salt);

    if (isPasswordValid == false) {
      res.status(400).send("Wrong password");
      return;
    }

    const token = generateAccessToken({ id: user.id });
    res.json({ user, token });
  }
  catch (err) {
    handleError(res, err, "Error while login user");
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.sendStatus(400); 
    return;
  }

  try {
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
      res.status(400).send("Invalid user ID");
      return;
    }
    const user = await findUser(userId);
    if (!user){
      res.status(404).send("User not found");
      return;
    }
  await userRepository.remove(user);
  res.status(204).send(); 
  }
  catch (err) {
    handleError(res, err, "Error while delete user");
  }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.sendStatus(400); 
    return;
  }
  try {
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
      res.status(400).send("Invalid user ID");
      return;
    }
    const user = await findUser(userId);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    addUserInDb(user, req.body);
    await userRepository.save(user);

    console.log("user are changed");
    res.json(user);
  }
  catch (err) {
    handleError(res, err, "Error while update user");
  }
}

export const getUser = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.sendStatus(400); 
    return;
  }

  try {
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
      res.status(400).send("Invalid user ID");
      return;
    }

    const user = await findUser(userId);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    const visibleParamsOfUser = {
      name: user.fullName,
      email: user.email,
      dateOfBirth: user.Dob
    }
    console.log(visibleParamsOfUser);
    res.json(visibleParamsOfUser);

  }
  catch (err) {
    handleError(res, err, "Error while get user");
  }
}

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.sendStatus(400); 
    return;
  }

  try {
    const users = await userRepository.find();
    if (!users || users.length === 0) {
      res.status(404).send("Users not found");
      return;
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
};


