import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

interface IDatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
}

const development: IDatabaseConfig = {
  username: process.env.BD_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  host: process.env.DB_HOST as string,
  dialect: "postgres",
};

const test: IDatabaseConfig = {
  username: process.env.BD_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  host: process.env.DB_HOST as string,
  dialect: "postgres",
};

const production: IDatabaseConfig = {
  username: process.env.BD_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  host: process.env.DB_HOST as string,
  dialect: "postgres",
};

export { development, test, production };
