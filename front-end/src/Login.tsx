import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "./AuthContext";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSecure, setIsSecure] = useState<boolean>(true);

  const handleLoginClick = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("Please fill in all fields.");
      setError(true);
      return;
    }

    try {
      const endpoint = isSecure
        ? "http://localhost:3000/login-secure"
        : "http://localhost:3000/login-insecure";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token);
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Invalid username or password.");
        setError(true);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      setError(true);
    }
  };

  const handleClose = () => {
    setError(false);
  };

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
          Login
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="dense"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    disableFocusRipple
                    disableRipple
                    sx={{
                      "&:focus": {
                        outline: "none",
                      },
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            size="small"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            onClick={handleLoginClick}
          >
            Login
          </Button>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setUsername("johndoe");
                setPassword("password123");
                setIsSecure(true);
              }}
            >
              John Doe Login Secure
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setUsername("johndoe' -- ");
                setPassword(" ");
                setIsSecure(false);
              }}
            >
              Hack John Doe
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setUsername("'; DROP TABLE users; -- ");
                setPassword(" ");
                setIsSecure(false);
              }}
            >
              drop table
            </Button>
          </Box>
        </Box>
      </Box>
      <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
