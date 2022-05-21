import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "../../../lib/auth";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const resOrPayload = await verifyAuth(req);

  return resOrPayload instanceof Response ? resOrPayload : NextResponse.next();
}
