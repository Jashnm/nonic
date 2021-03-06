// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import User from "../../../models/User";
import argon2 from "argon2";
import { IUser } from "../../../models/User";

type Data = {
  user?: { _id: string; name: string };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectToDatabase();

  if (req.method === "GET") {
    const users = await User.find({}).limit(1);
    const user = users[0] as IUser;

    return res.status(200).json({ user: { name: user.name, _id: user._id } });
  }
}
