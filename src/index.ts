import "reflect-metadata"
import { DataSource } from "typeorm"
const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.DB_HOST,Number(process.env.DB_PORT),process.env.DB_USERNAME );
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: ["src/entity/*.ts"],
    migrations: [],
    subscribers: [],
})
