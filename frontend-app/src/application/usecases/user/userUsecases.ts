import * as userService from "../../../infrastructure/services/user/userService";
import { IUser, IUserPayload, IUserUpdatePayload } from "../../../domain/models/User";


export async function getAllUsers(): Promise<IUser[]> {
  return await userService.fetchUsers();
}

export async function getUserByEmail(email: string): Promise<IUser> {
  return await userService.fetchUserByEmail(email);
}

export async function registerUser(payload: IUserPayload): Promise<IUser> {
  return await userService.createUser(payload);
}

export async function editUser(id: string, payload: IUserUpdatePayload): Promise<IUser> {
  return await userService.updateUser(id, payload);
}

export async function removeUser(id: string): Promise<void> {
  await userService.deleteUser(id);
}