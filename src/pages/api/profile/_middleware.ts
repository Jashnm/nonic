import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { verifyAuth } from "../../../lib/auth";
import { jsonResponse } from "../../../lib/utils";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const resOrPayload = await verifyAuth(req);

  return resOrPayload instanceof Response ? resOrPayload : NextResponse.next();
}
