const jwt = require('jsonwebtoken');
import { NextFunction, Request, Response } from "express";
import { User } from "../db/entity/User";
import { AppDataSource } from "../db/dataSource";
const userRepository = AppDataSource.getRepository(User);

async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  await jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, id: any) => {
    if (err) return res.sendStatus(403)
    const user = userRepository.findOneBy({id:id});
    if (!user) return res.status(404).send("User not found");
    next()
  })
}

export default authenticateToken;