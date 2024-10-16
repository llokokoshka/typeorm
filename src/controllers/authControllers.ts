import { Request, Response } from "express";
import { User } from "../db/entity/User";
import { AppDataSource } from "../db/dataSource";
import { generateAccessToken, validPassword } from "../utils/authUtils";
import { handleError } from "../utils/errorUtils";
import { addUserInDb } from "../utils/userUtils";

const userRepository = AppDataSource.getRepository(User);

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



