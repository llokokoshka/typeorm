import { AppDataSource } from "./index";
// import { EntityManager } from "typeorm";
import { User } from "./entity/User";
import { Todos } from "./entity/Todos";
import { Request, Response } from "express";
import userSchema from "./schemas/userSchema";
import validate from "./middleware/validate";
const express = require("express");
const bcrypt = require("bcrypt");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set("view engine", "hbs");

AppDataSource.initialize()
  .then(async () => {
    console.log("Connected to db");
  })
  .catch((error) => console.log(error));

const userRepository = AppDataSource.getRepository(User);

app.get("/", (_, res: Response) => {
  res.render("index.hbs");
});

app.get("/registrate", (_, res: Response) => {
  res.render("registrate.hbs");
});

app.post("/registrate", async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(400);
  try {
   let a = userSchema.validate(req.body, {abortEarly: false });
    const salt = await bcrypt.genSalt(10);
    const name = req.body.name;
    const password = await bcrypt.hash(req.body.password, salt);
    const user = new User();
    user.fullName = name;
    user.password = password;
    await userRepository.save(user);
    console.log("user are addited");
    res.redirect(`/user/${user.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while registering user");
  }
});

app.get("/user/:id", (req: Request, res: Response) => {
  res.render("userPage.hbs", { id: req.params.id });
});

app.post("/user/:id", async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(400);
  try {
    res.render("userPage.hbs");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while adding todo");
  }
});

app.listen(3000, function () {
  console.log("Сервер ожидает подключения...");
});
//     const userRepository = AppDataSource.getRepository(User);
//     const users = await userRepository.find()
