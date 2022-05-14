// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import argon2 from "argon2";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import User from "../../../models/User";
import jwt from "jsonwebtoken";
import { signJwt } from "../../../lib/auth";

type Data = {
  loggedIn?: boolean;
  exists?: boolean;
  token?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectToDatabase();

  if (req.method === "POST") {
    const { pin, secret } = req.body;
    const user = await User.findOne({ email: process.env.MY_EMAIL });

    if (!user) {
      return res.status(400).json({ exists: false });
    }

    if (process.env.MY_SECRET === secret) {
      const hashedPin = await argon2.hash(pin, {
        type: argon2.argon2d,
        hashLength: 36
      });
      user.pin = hashedPin;

      await user.save();
      return res.status(200).end();
    }

    return res.status(400).end();
  }
}
