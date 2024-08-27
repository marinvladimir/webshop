import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { LogoutButton } from "../../App";
import styled from "styled-components";
import { breakpoints } from "../../styles/breakpoints";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;

  input {
    height: 30px;
    width: 250px;

    @media (max-width: ${breakpoints.mobile}) {
      width: 100%;
    }
  }
`;

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
