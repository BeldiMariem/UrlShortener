import axios from "axios";
import * as userService from "./userService";
import { IUser, IUserPayload, IUserUpdatePayload } from "../../../domain/models/User";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("userService", () => {
  const token = "test-token";
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  beforeEach(() => {
    localStorage.setItem("token", token);
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("should fetch all users", async () => {
    const mockUsers: IUser[] = [
      { _id: "1", name: "Mariem", email: "mariem@example.com", password: "", role: "admin" },
    ];
    mockedAxios.get.mockResolvedValue({ data: mockUsers });

    const users = await userService.fetchUsers();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://localhost:5000/user/getAllUsers",
      headers
    );
    expect(users).toEqual(mockUsers);
  });

  it("should fetch user by email", async () => {
    const email = "mariem@example.com";
    const mockUser: IUser = { _id: "1", name: "Mariem", email, password: "", role: "admin" };
    mockedAxios.get.mockResolvedValue({ data: mockUser });

    const user = await userService.fetchUserByEmail(email);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `http://localhost:5000/user/getUserByEmail/${email}`,
      headers
    );
    expect(user).toEqual(mockUser);
  });

  it("should create a new user", async () => {
    const payload: IUserPayload = { name: "Mariem", email: "mariem@example.com", password: "pass" };
    const mockUser: IUser = { _id: "1", ...payload, role: "user" };
    mockedAxios.post.mockResolvedValue({ data: mockUser });

    const user = await userService.createUser(payload);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:5000/user/createUser",
      payload,
      headers
    );
    expect(user).toEqual(mockUser);
  });

  it("should update a user", async () => {
    const id = "1";
    const payload: IUserUpdatePayload = { name: "Mariem Updated" };
    const updatedUser: IUser = { _id: id, name: "Mariem Updated", email: "mariem@example.com", password: "", role: "user" };
    mockedAxios.put.mockResolvedValue({ data: updatedUser });

    const user = await userService.updateUser(id, payload);
    expect(mockedAxios.put).toHaveBeenCalledWith(
      `http://localhost:5000/user/updateUser/${id}`,
      payload,
      headers
    );
    expect(user).toEqual(updatedUser);
  });

  it("should delete a user", async () => {
    const id = "1";
    mockedAxios.delete.mockResolvedValue({ data: { message: "User deleted" } });

    const result = await userService.deleteUser(id);
    expect(mockedAxios.delete).toHaveBeenCalledWith(
      `http://localhost:5000/user/deleteUser/${id}`,
      headers
    );
    expect(result).toEqual({ message: "User deleted" });
  });
});
