// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import Note, { INote } from "../../models/Note";
type Data = {
  notes?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectToDatabase();

  if (req.method === "POST") {
    const { content, title } = JSON.parse(req.body);
    const note = new Note({ content, title });
    await note.save();

    res.status(201).end();
  }

  if (req.method === "GET") {
    let notes = await Note.find({}).lean();

    notes = notes.map((x) => ({ ...x, _id: x._id.toString() }));

    res.status(200).json({ notes });
  }
}
