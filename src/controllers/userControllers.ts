import { Request, Response } from "express";
import { User } from "../db/entity/User";
import { AppDataSource } from "../db/dataSource";
import { handleError } from "../utils/errorUtils";
import { findUser, addUserInDb } from "../utils/userUtils";

const userRepository = AppDataSource.getRepository(User);

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.sendStatus(400); 
    return;
  }

  try {
    const userId = Number(req.params.id);
    console.log(userId);
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
    console.log(req.params.id);
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


