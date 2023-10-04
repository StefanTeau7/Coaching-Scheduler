// src/models/UserModel.ts

export type UserType = 'coach' | 'student';

export interface User {
  id: number;
  type: UserType;
  name: string;
}
