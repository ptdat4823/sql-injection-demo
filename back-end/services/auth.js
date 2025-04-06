import {
  queryGetLoginUserInsecure,
  queryGetLoginUserSecure,
} from "../database/auth.js";
import { generateToken } from "./jwt.js";

export const LoginSecure = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }
  console.log("username", username);
  console.log("password", password);
  const result = await queryGetLoginUserSecure(username, password);
  const { error, data, code } = result;

  if (error) return res.status(code).json({ message: error });

  if (data && data.length > 0) {
    const token = generateToken(data[0]);
    return res.status(code).json({ token, user: data[0] });
  }

  return res.status(401).json({ message: "Invalid username or password." });
};

export const LoginInsecure = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }
  const result = await queryGetLoginUserInsecure(username, password);
  const { error, data, code } = result;
  console.log("result", result);

  if (error) return res.status(code).json({ message: error });

  if (data && data.length > 0) {
    const token = generateToken(data[0]);
    return res.status(code).json({ token, user: data[0] });
  }

  return res.status(401).json({ message: "Invalid username or password." });
};
