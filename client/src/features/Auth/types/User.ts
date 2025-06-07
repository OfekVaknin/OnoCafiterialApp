import type { UserRoleEnum } from "../enums/UserRole.enum";

export interface User {
  _id?: string;
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRoleEnum;
  createdAt: string;
}
