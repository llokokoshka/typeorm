import { AppDataSource } from './index';
import { EntityManager } from 'typeorm';
import { User } from './entity/User';
const express = require("express");
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));
app.set("view engine", "hbs");

AppDataSource.initialize().then(async () => {
  console.log('Connected to db');
}).catch(error => console.log(error))

const userRepository = AppDataSource.getRepository(User)

app.get('/', (_, res) => {
  res.render("index.hbs");
});

app.get('/registrate', (_, res) => {
  res.render("registrate.hbs");
});

app.post('/registrate', async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const salt = await bcrypt.genSalt(10);
  const name = req.body.name;
  const password = await bcrypt.hash(req.body.password, salt);
  const user = new User();
  user.userName = name;
  user.password = password;

  await userRepository.save(user);
  console.log('user are addited');
  res.redirect('/');
});

app.listen(3000, function () {
  console.log("Сервер ожидает подключения...");
});


//     const userRepository = AppDataSource.getRepository(User);
//     const users = await userRepository.find()
//     const fourthUser = await userRepository.findOneBy({
//       id: 4,
//   })

//   console.log('4 user: ', fourthUser)
// const user = new User()
// user.firstName = "Timber"
// user.lastName = "Saw"
// user.age = 25


// await userRepository.save(user)
// console.log("Saved a new user with id: " + user.id)

// console.log("Loaded users: ", users)