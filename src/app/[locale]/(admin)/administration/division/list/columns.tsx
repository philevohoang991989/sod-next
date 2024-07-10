"use client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Division = {
  id: string;
  name: string;
  status: boolean;
};
