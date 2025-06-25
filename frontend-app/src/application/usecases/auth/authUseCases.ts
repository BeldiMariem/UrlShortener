import { ILoginPayload, IRegisterPayload, IUser } from "../../../domain/models/User";

const API_URL = "http://localhost:5000/auth";

export async function login(payload: ILoginPayload): Promise<IUser> {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();

  if (data.token) {
    const user = data.user as IUser;
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userId", JSON.stringify(user._id));
  }
  if (data.user) {
  }
  return data.user;
}
export async function register(payload: IRegisterPayload): Promise<IUser> {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
}
export async function logout(): Promise<void> {
  const token = localStorage.getItem("token");

  await fetch("http://localhost:5000/auth/logout", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    credentials: "include",
  });

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("userId");
}