import { UserRoleEnum } from '../enums/UserRoleEnum';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRoleEnum;
  createdAt: string;
}
