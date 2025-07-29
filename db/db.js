import { Pool } from "pg";

const db = new Pool({
  connectionString: process.env.connectionString
});

export default db