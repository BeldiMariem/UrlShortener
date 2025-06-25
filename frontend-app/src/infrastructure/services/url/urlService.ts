import axios from "axios";
import { ICreateUrlPayload } from "../../../domain/models/Url";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/url";

export const createUrl = (data: ICreateUrlPayload, token: string) =>
  axios.post(`${API_URL}/createUrl`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const getUserUrls = (token: string) =>
  axios.get(`${API_URL}/listUrls`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteUrl = (shortId: string, token: string) =>
  axios.delete(`${API_URL}/deleteUrl/${shortId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
