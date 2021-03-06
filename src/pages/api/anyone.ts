// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import User from "../../models/User";
import argon2 from "argon2";

type Data = {
  exists: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectToDatabase();

  if (req.method === "GET") {
    const user = await User.find({}).limit(1);

    if (!user.length) return res.status(200).json({ exists: false });
    else return res.status(200).json({ exists: true });
  }
}
