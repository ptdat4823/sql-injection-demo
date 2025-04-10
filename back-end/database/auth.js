import { GetConnection } from "../config/database.js";
import { getError, getResult } from "./util.js";

const db = GetConnection();

export const queryGetLoginUserSecure = async (username, password) => {
  if (!db) return getError("Database connection failed.", 500);

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";

  try {
    return await new Promise((resolve, reject) => {
      db.query(query, [username, password], (err, results) => {
        if (err) return reject(err);
        if (results.length === 0) {
          return reject(getError("No user found.", 404));
        }
        return resolve(getResult(results[0], 200));
      });
    });
  } catch (error) {
    return getError("Something went wrong. Please try again later.", 500);
  }
};

export const queryGetLoginUserInsecure = async (username, password) => {
  if (!db) return getError("Database connection failed.", 500);

  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  console.info("\n[🧨 Constructed SQL]");
  console.log(query);

  try {
    return await new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) {
          console.error("\n[💥 SQL Error]", err.sqlMessage);
          return reject(err);
        }

        if (results.length === 0) {
          return reject(getError("No user found.", 404));
        }

        return resolve(getResult(results[0], 200));
      });
    });
  } catch (error) {
    return getError("Something went wrong. Please try again later.", 500);
  }
};
