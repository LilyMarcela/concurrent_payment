import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";

dotenv.config();

// Instantiate the Sequelize instance with your environment variables
export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "postgres",
  models: [__dirname + "/../models"], // Specify the folder containing your models
});

interface IDatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
}

const development: IDatabaseConfig = {
  username: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  host: process.env.DB_HOST as string,
  dialect: "postgres",
};

const test: IDatabaseConfig = {
  username: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  host: process.env.DB_HOST as string,
  dialect: "postgres",
};

const production: IDatabaseConfig = {
  username: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  host: process.env.DB_HOST as string,
  dialect: "postgres",
};

export { development, test, production };
