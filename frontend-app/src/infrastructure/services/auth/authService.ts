
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
export async function loginUser(email: string, password: string) {

  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  return data;
}
export async function logout(): Promise<void> {
  const token = localStorage.getItem("token");

  await fetch(`${API_URL}/auth/login`, {
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