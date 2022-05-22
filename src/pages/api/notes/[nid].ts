// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import Note, { INote } from "../../../models/Note";
import { decrypt, encrypt } from "../../../utils/cipher";
type Data = {
  note?: INote;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectToDatabase();
  const { nid } = req.query;
  const key = process.env.CIPHER_KEY! as string;

  if (req.method === "PUT") {
    const body = req.body;
    let note = await Note.findByIdAndUpdate(
      nid,
      { ...body, content: await encrypt(body.content, key) },
      { new: true }
    );

    if (!note) {
      res.status(404).end();
    }

    res.status(200).end();
  }

  if (req.method === "GET") {
    let note = await Note.findById(nid);

    if (!note) {
      res.status(404).end();
    }

    return res.status(200).json({
      note: { ...note.toJSON(), content: await decrypt(note.content, key) }
    });
  }
  if (req.method === "DELETE") {
    let note = await Note.findByIdAndDelete(nid);

    if (!note) {
      res.status(404).end();
    }

    return res.status(200).end();
  }
}
