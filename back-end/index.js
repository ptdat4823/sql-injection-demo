import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { LoginSecure, LoginInsecure } from "./services/auth.js";
import { GetConnection } from "./config/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

app.use(cors());
const db = GetConnection();

app.get("/users", (req, res) => {
  const query = "SELECT fullname, username, password FROM users";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching user data:", err);
      res.status(500).send("Error fetching user data");
      return;
    }
    res.json(results);
  });
});

app.post("/login-secure", LoginSecure);
app.post("/login-insecure", LoginInsecure);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
