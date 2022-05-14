// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import Note, { INote } from "../../../models/Note";
import { decrypt } from "../../../utils/cipher";
type Data = {
  note?: INote;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectToDatabase();
  const { nid } = req.query;
  if (req.method === "PUT") {
    const body = JSON.parse(req.body);
    let note = await Note.findByIdAndUpdate(nid, { ...body }, { new: true });

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

    const key = process.env.CIPHR_KEY! as string;
    res
      .status(200)
      .json({ note: { ...note, content: await decrypt(note.content, key) } });
  }
}
