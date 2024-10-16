import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { User } from "../db/entity/User";
import { AppDataSource } from "../db/dataSource";
import { handleError } from '../utils/errorUtils';
// import  * as dotenv from "dotenv"
// dotenv.config();
const userRepository = AppDataSource.getRepository(User);

async function authenticateToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    res.sendStatus(401);
    return;
  };
  jwt.verify(token, process.env.TOKEN_SECRET as string, async (err: any, decodedToken: any) => {
    if (err) {
      res.sendStatus(403);
      return;
    }
    const userId = decodedToken?.id;
    if (!userId || isNaN(userId)) {
      res.status(403).send("Invalid token payload");
      return;
    }
    try {
      const user =  await userRepository.findOneBy({ id: userId });
      if (!user) {
        res.status(404).send("User not found");
        return;
      }
      req.user = user;
      next()
    }
    catch (err) {
      handleError(res, err, "Server error");
    }
  })
}

export default authenticateToken;