export const UserRoleEnum = {
  Student: 'student',
  Admin: 'admin',
} as const;

export type UserRoleEnum = typeof UserRoleEnum[keyof typeof UserRoleEnum];
