import { Request, Response } from "express";
import { registrate, login, deleteUser, updateUser, getUser } from "../controllers/appControllers";
const { Router } = require('express')
const router = Router();

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