"use client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AuditLogType = {
  createDateTime: string;
  user: UserType;
  fileName?: string;
};
export type UserType={
  id?: number;
  email?: string;
  govHrm?: string;
  title?: string;
  firstName?: string;
  lastName?:string
}