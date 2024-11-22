export interface UserData {
  id: string;
  name: string;
  login: string;
}

export interface UserSecretData {
  password: string;
}

export interface User extends UserData, UserSecretData {}

export type UserDataKeys = keyof UserData;
