import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { useAuth } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

const Home: React.FC = () => {
  const { token, logout } = useAuth();
  let username = "";
  if (token) {
    try {
      const decoded: { username: string } = jwtDecode(token);
      username = decoded.username;
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }
  return (
    <Container
      component="main"
      disableGutters
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          marginTop: 0,
          alignSelf: "center",
          justifySelf: "center",
          placeSelf: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Typography component="h1" variant="h2" color="black" sx={{ mb: 4 }}>
          Welcome, {username}!
        </Typography>
        <Button variant="contained" color="primary" onClick={logout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
