import type { UserRoleEnum } from "../enums/UserRole.enum";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRoleEnum;
  createdAt: string;
}
