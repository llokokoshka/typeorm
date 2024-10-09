import { AppDataSource } from './index';
import { EntityManager } from 'typeorm';
import { User } from './entity/User';
import { Todos } from './entity/Todos';
import {Request, Response, } from 'express';
const express = require("express");
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));
app.set("view engine", "hbs");

AppDataSource.initialize()
.then(async () => {
  console.log('Connected to db');
}).catch(error => console.log(error))

const userRepository = AppDataSource.getRepository(User)

app.get('/', (_, res:Response) => {
  res.render("index.hbs");
});

app.get('/registrate', (_, res:Response) => {
  res.render("registrate.hbs");
});

app.post('/registrate', async (req:Request, res:Response) => {
  if (!req.body) return res.sendStatus(400);
  const salt = await bcrypt.genSalt(10);
  const name = req.body.name;
  const password = await bcrypt.hash(req.body.password, salt);
  const user = new User();
  user.userName = name;
  user.password = password;

  await userRepository.save(user);
  console.log('user are addited');
  res.redirect('/todos/:id');
});

app.get('/todos/:id', (_, res:Response) => {
  res.render("todos.hbs");
});

app.post('/todos/:id', async(req:Request, res:Response) => {
  if (!req.body) return res.sendStatus(400);
  const value = req.body.value;
  const todo = new Todos();
  todo.value = value;
  await userRepository.save(todo);
  console.log('todo are addited');
  res.render("todos.hbs");
});


app.listen(3000, function () {
  console.log("Сервер ожидает подключения...");
});
//     const userRepository = AppDataSource.getRepository(User);
//     const users = await userRepository.find()