import axios from "axios";
import { ICreateUrlPayload } from "../../../domain/models/Url";

const API_URL = process.env.REACT_APP_API_URL;

export const createUrl = (data: ICreateUrlPayload, token: string) =>
  axios.post(`${API_URL}/url/createUrl`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const getUserUrls = (token: string) =>
  axios.get(`${API_URL}/url/listUrls`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteUrl = (shortId: string, token: string) =>
  axios.delete(`${API_URL}/url/deleteUrl/${shortId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
