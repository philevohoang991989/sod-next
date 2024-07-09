"use client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserPermission = {
  userId: string;
  postTitle: string;
  firstName: string;
  lastName: string;
  govHrm: string;
  email: string;
  groupId: string;
};
