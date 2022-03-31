import mongoose from "mongoose";

export interface INote {
  _id: string;
  content: string;
  title: string;
  locked?: boolean;
  createdAt?: string;
  upDatedAt?: string;
}

const NoteSchema = new mongoose.Schema<INote>(
  {
    content: { type: String, required: true },
    title: { type: String, required: true },
    locked: Boolean
  },
  { timestamps: true }
);

const Note = mongoose.models.Note || mongoose.model("Note", NoteSchema);

export default Note;