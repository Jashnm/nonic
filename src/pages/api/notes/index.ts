// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import Note, { INote } from "../../../models/Note";
type Data = {
  notes?: any;
  _id?: string;
};
import { decrypt, encrypt } from "../../../utils/cipher";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectToDatabase();

  const key = process.env.CIPHER_KEY! as string;

  if (req.method === "POST") {
    const { content, title } = req.body as { content: string; title: string };
    const key = process.env.CIPHER_KEY! as string;
    const encoded = await encrypt(content, key);
    const note = new Note({ content: encoded, title });
    await note.save();

    return res.status(201).json({ _id: note._id });
  }

  if (req.method === "GET") {
    const { page = 0, perPage = 25, query } = req.query;

    if (!!query) {
      let notes = await Note.aggregate([
        {
          $match: {
            $or: [{ $text: { $search: query } }]
          }
        },

        {
          $sort: {
            score: { $meta: "textScore" }
          }
        }
      ])
        .skip(Number(perPage) * Number(page))
        .limit(Number(perPage));

      notes = await Promise.all(
        notes.map(async (x) => ({
          ...x,
          _id: x._id.toString(),
          content: await decrypt(x.content, key)
        }))
      );

      return res.status(200).json({ notes });
    }
    let notes = await Note.find({})
      .sort({ updatedAt: -1 })
      .skip(Number(perPage) * Number(page))
      .limit(Number(perPage))
      .lean();

    notes = await Promise.all(
      notes.map(async (x) => ({
        ...x,
        _id: x._id.toString(),
        content: await decrypt(x.content, key)
      }))
    );

    res.status(200).json({ notes });
  }
}
