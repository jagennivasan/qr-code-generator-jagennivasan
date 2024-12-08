import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs"; 
import { NextResponse } from "next/server";
import { z } from "zod";

const registrationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = body;

    const validationResult = registrationSchema.safeParse({
      email,
      name,
      password,
    });

    if (!validationResult.success) {
      // Extract error messages from zod validation
      const errors = validationResult.error.errors.map(error => error.message);
      return NextResponse.json(
        { user: null, message: errors.join(", ") },
        { status: 400 }
      );
    }

    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "This email already exists" },
        { status: 409 }
      );
    }

    // Hash the password with bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // Store the hashed password
      },
    });
    const { password: newUserPassword, ...rest } = newUser;
    return NextResponse.json(
      { user: rest, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      // { user: null, message: "An error occurred",error },
      // { status: 500 }
      console.log(error)
      
    );
  }
}
