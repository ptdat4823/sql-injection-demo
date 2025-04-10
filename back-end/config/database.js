// config/database.js
import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

let dbConnection;

export const GetConnection = () => {
  if (dbConnection) return dbConnection;
  dbConnection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    multipleStatements: true,
  });
  dbConnection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      return;
    }
    console.log("Connected to the MySQL database.");
  });
  return dbConnection;
};
