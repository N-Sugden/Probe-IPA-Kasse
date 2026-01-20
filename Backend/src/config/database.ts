import { Pool } from "pg";

export const db = new Pool({
  host: "localhost",
  port: 5432,
  user: "kasse_user",
  password: "kasse_password",
  database: "kasse_db"
});
