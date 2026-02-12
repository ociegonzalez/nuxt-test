import bcrypt from "bcryptjs";
import { z } from "zod";

const bodySchema = z.object({
  email: z
    .string()
    .toLowerCase()
    .trim()
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Email is not valid",
    }),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse);

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user)
    throw createError({
      status: 401,
      message: "Bad Credentials (email)",
    });

  const userSeassion = {
    id: user.id,
    name: user.name,
    email: user.email,
    roles: user.roles,
  };

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  await setUserSession(event, userSeassion);

  if (!isPasswordValid)
    throw createError({
      status: 401,
      message: "Bad Credentials (password)",
    });

  return {
    message: "Login Succesul",
    user: userSeassion,
  };
});
