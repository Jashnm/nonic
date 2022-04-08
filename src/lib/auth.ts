// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

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
    const verified = (await jwt.verify(
      token,
      new TextEncoder().encode(JWT_SECRET_KEY).toString()
    )) as string;
    const id = Buffer.from(verified, "base64").toString();
    return { id } as UserJwtPayload;
  } catch (err) {
    return jsonResponse(401, { error: { message: "Your token has expired." } });
  }
}

/**
 * Adds the user token cookie to a response.
 */
// export async function setAuthHeader(
//   request: NextRequest,
//   response: NextResponse
// ) {
//   const authorization = request.headers.get('authorization');

//   if (!authorization) {
//     const token = jwt.sign()
//       .setProtectedHeader({ alg: "HS256" })
//       .setJti(nanoid())
//       .setIssuedAt()
//       .setExpirationTime("2h")
//       .sign(new TextEncoder().encode(JWT_SECRET_KEY));
//     response.cookie(USER_TOKEN, token, { httpOnly: true });
//   }

//   return response;
// }

export function signJwt(userId: string) {
  return jwt.sign(
    Buffer.from(userId.toString()).toString("base64"),
    new TextEncoder().encode(JWT_SECRET_KEY).toString()
  );
}
