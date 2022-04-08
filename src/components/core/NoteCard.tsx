import React from "react";
import { INote } from "../../models/Note";
import md from "../../utils/markdown";
import xss from "xss";
import Link from "next/link";
import truncate from "../../utils/truncate";
import dayjs, { getRelativeTime } from "../../utils/dayjs";

const NoteCard: React.FC<{ note: INote }> = ({ note }) => {
  return (
    <div
      className={`card relative transition duration-500 ease-in-out hover:scale-105 active:scale-100 cursor-pointer lg:max-w-lg sm:max-w-sm max-w-sm w-full bg-secondary shadow-xl`}
    >
      <time
        dateTime={note.createdAt}
        className="absolute right-0  p-1.5 text-sm rounded-bl-box text-accent-content bg-accent"
      >
        {getRelativeTime(note.createdAt)}
      </time>
      <div className="card-body">
        <h2 className="card-title truncate text-primary-content">
          {note.title}
        </h2>
        <div
          className="text-secondary-content prose"
          dangerouslySetInnerHTML={{
            __html: truncate(md.render(note.content), 200)
          }}
        ></div>
      </div>
      <Link href={`/notes/${note._id}`}>
        <a className="inset-0 absolute" />
      </Link>
    </div>
  );
};

export default NoteCard;
