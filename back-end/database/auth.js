import { GetConnection } from "../config/database.js";
import { getError, getResult } from "./util.js";

const db = GetConnection();

export const queryGetLoginUserSecure = async (username, password) => {
  if (!db) return getError("Database connection failed.", 500);

  const query = "SELECT * FROM account WHERE username = ? AND password = ?";

  try {
    return await new Promise((resolve, reject) => {
      db.query(query, [username, password], (err, results) => {
        if (err) return reject(err);
        return resolve(getResult(results, 200));
      });
    });
  } catch (error) {
    return getError("Query execution failed.", 500);
  }
};

export const queryGetLoginUserInsecure = async (username, password) => {
  if (!db) return getError("Database connection failed.", 500);

  const query = `SELECT * FROM account WHERE username = '${username}' AND password = '${password}'`;
  console.log("query", query);
  try {
    return await new Promise((resolve, reject) => {
      db.query(query, [username, password], (err, results) => {
        if (err) return reject(err);
        return resolve(getResult(results, 200));
      });
    });
  } catch (error) {
    return getError("Query execution failed.", 500);
  }
};
