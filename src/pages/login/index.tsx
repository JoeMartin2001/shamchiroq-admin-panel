import { Box, Button, Container, TextField } from "@mui/material";
import React from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;

        alert(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ paddingY: 30 }}>
      <form onSubmit={handleSubmit}>
        <Box
          marginBottom={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box height={100} width={100}>
            <img src="/logo.png" alt="Logo" style={{ height: "100%" }} />
          </Box>{" "}
        </Box>

        <Box marginBottom={2}>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box marginBottom={2}>
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            label="Password"
            variant="outlined"
            fullWidth
          />
        </Box>

        <Button
          type="submit"
          disabled={isLoading}
          fullWidth
          variant="contained"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
