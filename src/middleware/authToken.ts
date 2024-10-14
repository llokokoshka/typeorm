const jwt = require('jsonwebtoken');
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../index";
const userRepository = AppDataSource.getRepository(User);

async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  await jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, id: any) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    const user = userRepository.findOneById(id);
    if (!user) return res.status(500).send("Error while registering user");
    next()
  })
}

export default authenticateToken;