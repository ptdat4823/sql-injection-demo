import {
  queryGetLoginUserInsecure,
  queryGetLoginUserSecure,
} from "../database/auth.js";
import { isEmpty } from "../utils/func.js";
import { generateToken } from "./jwt.js";

export const LoginSecure = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }
  const result = await queryGetLoginUserSecure(username, password);
  const { error, data, code } = result;

  if (error) return res.status(code).json({ message: error });

  if (!isEmpty(data)) {
    const token = generateToken(data);
    return res.status(code).json({ token, user: data });
  }

  return res.status(401).json({ message: "Invalid username or password." });
};

export const LoginInsecure = async (req, res) => {
  const { username, password } = req.body;
  console.log("--------------------- 🚀 Start a request ---------------------");

  console.info("\n[🔐 Login Attempt]");
  console.log("Username:", username);
  console.log("Password:", password);

  const result = await queryGetLoginUserInsecure(username, password);
  const { error, data, code } = result;

  if (error) {
    console.error("\n[❌ Error from DB]", error);
    return res.status(code).json({ message: error });
  }

  console.info("\n[📦 Query Result]", data);

  if (!isEmpty(data)) {
    console.info("\n[✅ Login Successful]", data);
    const token = generateToken(data);
    return res.status(code).json({ token, user: data });
  }

  console.error("\n[🚫 Login Failed]");
  return res.status(401).json({ message: "Invalid username or password." });
};
