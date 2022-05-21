// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";

import { jsonResponse } from "./utils";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;

interface UserJwtPayload {
  id: string;
}

/**
 * Verifies the user's JWT token and returns the payload if
 * it's valid or a response if it's not.
 */
export async function verifyAuth(request: NextRequest) {
  const authToken = request.headers.get("authorization");

  if (!authToken) {
    return jsonResponse(401, { error: { message: "Missing user token" } });
  }
  const token = authToken.split(" ")[1];

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET_KEY)
    );

    const id = Buffer.from(verified.payload.jti!, "base64").toString();

    return { id } as UserJwtPayload;
  } catch (err) {
    return jsonResponse(401, { error: { message: "Your token has expired." } });
  }
}

export async function signJwt(userId: string) {
  return await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setJti(Buffer.from(userId.toString()).toString("base64"))
    .sign(new TextEncoder().encode(JWT_SECRET_KEY));
}
