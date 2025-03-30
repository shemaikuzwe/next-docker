import { db } from "./db";

export async function getUsers() {
  const users = await db.user.findMany();
  return users;
}
