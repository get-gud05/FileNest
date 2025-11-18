import React, { useState } from 'react';
import AuthForm from './AuthForm';

export function Login({ onLogin, onShowRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("user", username);
      onLogin(username);
    } else {
      setError(data.error || "Login failed");
    }
  }

  return (
    <AuthForm
      title="Sign In"
      onSubmit={handleLogin}
      onToggle={onShowRegister}
      toggleText="New user? Register"
      error={error}
    >
      <input
        className="input-field"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        className="input-field"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
    </AuthForm>
  );
}