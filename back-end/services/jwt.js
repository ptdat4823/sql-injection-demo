import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  return jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "1h" });
};
