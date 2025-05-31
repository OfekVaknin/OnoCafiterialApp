import { createContext, useContext } from 'react';

export type UserType = 'student' | 'admin';

export interface UserContextType {
  userType: UserType;
}

export const UserContext = createContext<UserContextType>({ userType: 'student' });

export const useUser = () => useContext(UserContext);
