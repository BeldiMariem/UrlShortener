import axios from "axios";
import { IUser, IUserPayload, IUserUpdatePayload } from "../../domain/models/User";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/user";

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
  const res = await axios.get(`${API_URL}/getAllUsers`, getAuthHeader());
  return res.data;
}

export async function fetchUserByEmail(email: string): Promise<IUser> {
  const res = await axios.get(`${API_URL}/getUserByEmail/${email}`, getAuthHeader());
  return res.data;
}

export async function createUser(payload: IUserPayload): Promise<IUser> {
  const res = await axios.post(`${API_URL}/createUser`, payload, getAuthHeader());
  return res.data;
}

export async function updateUser(id: string, payload: IUserUpdatePayload): Promise<IUser> {
  const res = await axios.put(`${API_URL}/updateUser/${id}`, payload, getAuthHeader());
  return res.data;
}

export async function deleteUser(id: string): Promise<{ message: string }> {
  const res = await axios.delete(`${API_URL}/deleteUser/${id}`, getAuthHeader());
  return res.data;
}
