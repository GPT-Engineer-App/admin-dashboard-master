import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      console.log("Login failed");
    }
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Login
      </Heading>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Button mt={4} colorScheme="blue" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
