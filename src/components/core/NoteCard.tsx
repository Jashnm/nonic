import React from "react";
import { INote } from "../../models/Note";
import md from "../../utils/markdown";
import xss from "xss";

const NoteCard: React.FC<{ note: INote }> = ({ note }) => {
  return (
    <div
      className={`card relative transition duration-500 ease-in-out hover:scale-105 active:scale-100 cursor-pointer lg:max-w-md sm:max-w-sm max-w-sm w-full bg-secondary shadow-xl`}
    >
      <div className="card-body">
        <h2 className="card-title truncate text-primary-content">
          {note.title}
          {note.title}
          {note.title}
          {note.title}
          {note.title}helllllllooo
        </h2>
        <p
          className="text-secondary-content"
          dangerouslySetInnerHTML={{ __html: md.render(note.content) }}
        ></p>
      </div>
    </div>
  );
};

export default NoteCard;
