import { AppDataSource } from "./db/dataSource";
import allRoutes from './routes/routes';
import * as express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(allRoutes);

AppDataSource.initialize()
  .then(async () => {
    console.log("Connected to db");
  })
  .catch((error) => console.log(error));

app.listen(3000, function () {
  console.log("Сервер ожидает подключения...");
});
