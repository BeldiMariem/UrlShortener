import React, { useState } from "react";
import { registerUser } from "../../../application/usecases/user/userUsecases";
import { IUserPayload } from "../../../domain/models/User";

export const UserForm: React.FC = () => {
  const [form, setForm] = useState<IUserPayload>({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await registerUser(form);
      setSuccess("User created successfully");
      setForm({ name: "", email: "", password: "" });
    } catch {
      setError("Failed to create user");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create User</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <br />
      <button type="submit">Create</button>
    </form>
  );
};
