import { useState } from "react";
import Home from "./Home";
import Login from "./Login";
import "./App.css";
import { Box } from "@mui/material";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (user: string, pass: string) => {
    setUsername(user);
    setPassword(pass);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUsername("");
    setPassword("");
    setIsLoggedIn(false);
  };
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "gray",
      }}
    >
      {isLoggedIn ? (
        <Home username={username} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </Box>
  );
}

export default App;
