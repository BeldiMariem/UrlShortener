export interface IUser {
_id: string;
  name: string;
  email: string;
  role: string;
  password: string;
}

export interface IUserPayload {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface IUserUpdatePayload {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}
export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}