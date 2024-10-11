import { User } from "../entity/User";
const {Router} = require('express')
import { Request, Response } from "express";
import userSchema from "../schemas/userSchema";
import {validate} from "../middleware/validate";
import { AppDataSource } from "../index";
import { registrate, login, deleteUser, updateUser, getUser } from "../controllers/appControllers";
import authenticateToken from "../middleware/authToken";
const router = Router();
const dotenv = require('dotenv');
dotenv.config();

router.get("/", (_, res: Response) => {
  res.render("index.hbs");
});

router.get("/registrate", (_, res: Response) => {
  res.render("registrate.hbs");
});

router.post("/registrate", registrate);

router.get("/user/:id", getUser);

router.post("/user/:id");

module.exports = router;