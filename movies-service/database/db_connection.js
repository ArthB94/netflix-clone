import dotenv from "dotenv";
import knex from "knex";

dotenv.config();

const db = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
});

export { db };
