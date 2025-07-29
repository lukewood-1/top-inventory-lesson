import { Client } from "pg";


const main = async () => {
  const db = new Client({
    connectionString: process.env.connectionString
  });

  const query = `
    CREATE DATABASE inventory_app;

    CREATE TABLE IF NOT EXISTS category (
      id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR(30) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS path (
      id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR(30) NOT NULL,
      category_id INT REFERENCES category(id)
    );

    CREATE TABLE IF NOT EXISTS action (
      id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR(30) NOT NULL,
      path_id INT REFERENCES path(id)
    )
  `;
  console.log('Seeding...')
  
  await db.connect();
  await db.query(query);
  await db.end();

  console.log('done.')
};

main();