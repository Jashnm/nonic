// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import argon2 from "argon2";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import User from "../../../models/User";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectToDatabase();

  if (req.method === "PUT") {
    const { oldPin, newPin } = req.body;

    const user = await User.findOne({});

    if (!user) {
      return res.status(400).json({ exists: false });
    }

    const isCorrectPin = await argon2.verify(user.pin, oldPin, {
      type: argon2.argon2d,
      hashLength: 36
    });

    if (!isCorrectPin) {
      return res.status(400).json({ message: "Invalid Pin" });
    }

    const hashedPin = await argon2.hash(newPin, {
      type: argon2.argon2d,
      hashLength: 36
    });
    user.pin = hashedPin;

    await user.save();
    return res.status(200).end();
  }
}
