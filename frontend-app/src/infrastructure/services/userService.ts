import axios from "axios";
import { IUser, IUserPayload, IUserUpdatePayload } from "../../domain/models/User";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function getAuthHeader() {
  const token = localStorage.getItem("token"); 
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export async function fetchUsers(): Promise<IUser[]> {
  console.log(localStorage.getItem("token"))
  const res = await axios.get(`${API_URL}/user/getAllUsers`, getAuthHeader());
  return res.data;
}

export async function fetchUserByEmail(email: string): Promise<IUser> {
  const res = await axios.get(`${API_URL}/user/getUserByEmail/${email}`, getAuthHeader());
  return res.data;
}

export async function createUser(payload: IUserPayload): Promise<IUser> {
  const res = await axios.post(`${API_URL}/user/createUser`, payload, getAuthHeader());
  return res.data;
}

export async function updateUser(id: string, payload: IUserUpdatePayload): Promise<IUser> {
  const res = await axios.put(`${API_URL}/user/updateUser/${id}`, payload, getAuthHeader());
  return res.data;
}
export async function updateProfile(id: string,data: { name?: string; email?: string; password?: string }) {
  const cleanId = id.replace(/^"|"$/g, '');

  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:5000/auth/profile/${cleanId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update profile");
  }

  return response.json();
}

export async function deleteUser(id: string): Promise<{ message: string }> {
  const res = await axios.delete(`${API_URL}/user/deleteUser/${id}`, getAuthHeader());
  return res.data;
}
