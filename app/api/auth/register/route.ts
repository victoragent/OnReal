import { NextResponse } from "next/server";
import { registerPayloadSchema } from "@/lib/auth/validators";
import { registerUser } from "@/lib/auth/service";
import { AuthError } from "@/lib/auth/service";

export async function POST(request: Request) {
  try {
    const json = await request.json().catch(() => ({}));
    const parsed = registerPayloadSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid input",
          details: parsed.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const user = await registerUser(parsed.data);

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof AuthError && error.code === "USER_EXISTS") {
      return NextResponse.json(
        {
          error: "User already exists"
        },
        { status: 409 }
      );
    }

    console.error("Register API error", error);
    return NextResponse.json(
      {
        error: "Unexpected error"
      },
      { status: 500 }
    );
  }
}
