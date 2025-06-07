export const USER_ROLE = {
  Student: "student",
  Admin: "admin",
} as const;

export type UserRoleEnum = (typeof USER_ROLE)[keyof typeof USER_ROLE];
