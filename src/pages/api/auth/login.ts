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

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectToDatabase();

  const user = await User.find({}).limit(1);

  if (!user.length) {
    return res.status(200).json({ exists: false, loggedIn: false });
  }

  const { pin } = JSON.parse(req.body);

  try {
    if (
      await argon2.verify(user[0].pin, pin, {
        type: argon2.argon2d,
        hashLength: 36
      })
    ) {
      const userId = user[0]._id;

      return res.status(200).json({ token: signJwt(userId), loggedIn: true });
    } else {
      res.status(403).end();
    }
  } catch (error) {
    res.status(401).end();
  }
}
