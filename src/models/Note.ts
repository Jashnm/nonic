import mongoose from "mongoose";

export interface INote {
  _id: string;
  content: string;
  title: string;
  locked?: boolean;
  createdAt: string;
  updatedAt: string;
}

const NoteSchema = new mongoose.Schema<INote>(
  {
    content: { type: String, required: true, index: "text" },
    title: { type: String, required: true, index: "text" },
    locked: Boolean
  },
  { timestamps: true }
);

const Note = mongoose.models.Note || mongoose.model("Note", NoteSchema);

export default Note;
