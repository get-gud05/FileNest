import React, { useState } from 'react';
import AuthForm from './AuthForm';

export function Register({ onRegister, onShowLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("user", username);
      onRegister(username);
    } else {
      setError(data.error || "Registration failed");
    }
  }

  return (
    <AuthForm
      title="Register"
      onSubmit={handleRegister}
      onToggle={onShowLogin}
      toggleText="Already have an account? Login"
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