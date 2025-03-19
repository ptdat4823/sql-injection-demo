import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";

interface HomeProps {
  username: string;
  onLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ username, onLogout }) => {
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
        <Button variant="contained" color="primary" onClick={onLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
