import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { LogoutButton } from "../../App";
import { Form, InputGroup } from "./LoginStyledComponents";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      setError(null);
    } catch (err) {
      setError("Invalid credentials or login failed.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputGroup>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <LogoutButton type="submit">Login</LogoutButton>
      </Form>
    </div>
  );
};

export default Login;
