"use server";
import z from "zod";
import { db } from "./db";
import { revalidatePath } from "next/cache";
const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(2),
});
export async function addUser(
  prevState: string,
  formData: FormData
): Promise<string> {
  const validate = createUserSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validate.success) {
    return "error"
  }
  await db.user.create({
    data: validate.data,
  });
  revalidatePath("/")
  return "User created";
}
