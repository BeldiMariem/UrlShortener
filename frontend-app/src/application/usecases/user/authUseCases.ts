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
    localStorage.setItem("token", data.token);
  }

  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
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
