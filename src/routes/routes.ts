import { User } from "../entity/User";
const {Router} = require('express')
import { Todos } from "../entity/Todos";
import { Request, Response } from "express";
import userSchema from "../schemas/userSchema";
import validate from "../middleware/validate";
import { AppDataSource } from "../index";
const bcrypt = require("bcrypt");
const router = Router();

const userRepository = AppDataSource.getRepository(User);

router.get("/", (_, res: Response) => {
  res.render("index.hbs");
});

router.get("/registrate", (_, res: Response) => {
  res.render("registrate.hbs");
});

router.post("/registrate", async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(400);
  try {
    userSchema.validate(req.body, { abortEarly: false });
    const salt = await bcrypt.genSalt(10);
    const name = req.body.name;
    const password = await bcrypt.hash(req.body.password, salt);
    const email = req.body.email
    const dob = req.body.dob;
    const user = new User();
    user.fullName = name;
    user.Email = email;
    user.Dob = dob;
    user.password = password;
    await userRepository.save(user);
    console.log("user are addited");
    res.redirect(`/user/${user.id}`, user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while registering user");
  }
});

router.get("/user/:id", async(req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneById(req.params.id);

  res.render("userPage.hbs", {
    fullName: user.fullName,
    email: user.Email,
    dob: user.Dob
  });
});

router.post("/user/:id", async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(400);
  try {
    res.render("userPage.hbs");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while adding todo");
  }
});

module.exports = router;