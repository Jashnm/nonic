// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import argon2 from "argon2";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import User from "../../../models/User";
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
    const { pin, name } = req.body;

    const userExists = await User.countDocuments({});

    if (userExists) {
      return res.status(400).json({ exists: true });
    }

    const hashedPin = await argon2.hash(pin, {
      type: argon2.argon2d,
      hashLength: 36
    });

    const user = new User({
      name,
      pin: hashedPin
    });
    await user.save();
    return res.status(201).json({ token: signJwt(user._id), loggedIn: true });
  }
}
