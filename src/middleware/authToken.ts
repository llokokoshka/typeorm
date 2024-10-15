import jwt = require('jsonwebtoken');
import { NextFunction, Request, Response } from "express";
import { User } from "../db/entity/User";
import { AppDataSource } from "../db/dataSource";
const userRepository = AppDataSource.getRepository(User);

async function authenticateToken(req: Request, res: Response, next: NextFunction):Promise<void> {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) {
    res.sendStatus(401);
    return;
  };
  jwt.verify(token, process.env.TOKEN_SECRET as string, async (err: any, decodedToken: any) => {
    if (err)  {
      res.sendStatus(403);
      return;
    }
    const userId = decodedToken?.id;
    if  (!userId) {
      res.status(403).send("Invalid token payload");
      return;
    }
    try{
      const user = userRepository.findOneBy({id:userId});
      if (!user) {
        res.status(404).send("User not found");
        return;
      }
    next()
    }
    catch(err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  })
}

export default authenticateToken;