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
    const { email, pin, name } = JSON.parse(req.body) as {
      email: string;
      pin: string;
      name?: string;
    };

    const userExists = await User.countDocuments();

    if (userExists) {
      res.status(400).json({ exists: true });
    }

    const hashedPin = await argon2.hash(pin, {
      type: argon2.argon2d,
      hashLength: 36
    });

    const user = new User({ email, name, pin: hashedPin });
    await user.save();
    res.status(201).json({ token: signJwt(user._id), loggedIn: true });
  }
}
