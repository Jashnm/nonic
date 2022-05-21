import { FormEvent, useEffect, useState } from "react";
import BaseLayout from "../../components/core/layouts/BaseLayout";
import { INote } from "../../models/Note";
import { ExtendedNextPage } from "../../next";
import md from "../../utils/markdown";
import toast from "react-hot-toast";
import { getRelativeTime } from "../../utils/dayjs";
import {
  boldCommand,
  codeCommand,
  headingLevel1Command,
  headingLevel2Command,
  headingLevel3Command,
  imageCommand,
  italicCommand,
  linkCommand,
  orderedListCommand,
  unorderedListCommand,
  useTextAreaMarkdownEditor
} from "react-mde";
import dynamic from "next/dynamic";
const Toolbar = dynamic(() => import("../../components/editor/Toolbar"));
import Router from "next/router";
import useSwr from "swr";

const IndividualNotePage: ExtendedNextPage = () => {
  console.log(Router.query);

  const { data, error } = useSwr<{ note: INote }>(
    Router.query.id ? `/notes/${Router.query.id}` : null,
    { refreshInterval: 0 }
  );

  const note = data?.note;

  const [title, setTitle] = useState<string | undefined>(note?.title || "");
  const [content, setContent] = useState<string>(note?.content || "");
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const { ref, commandController, textController } = useTextAreaMarkdownEditor({
    commandMap: {
      bold: boldCommand,
      italic: italicCommand,
      code: codeCommand,
      image: imageCommand,
      head1: headingLevel1Command,
      head2: headingLevel2Command,
      head3: headingLevel3Command,
      orderedList: orderedListCommand,
      unorderedList: unorderedListCommand,
      link: linkCommand
    }
  });

  useEffect(() => {
    if (note) {
      if (!title) setTitle(note.title);
      if (!content) setContent(note.content);
    }
  }, [note]);

  if (!note) {
    return (
      <div className="flex flex-col items-center pb-6 h-fit">
        <h3>404 Not found</h3>
      </div>
    );
  }

  const onUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`/api/notes/${note._id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content: ref.current?.value })
      });

      toast.success("Updated!");
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex flex-col items-center pb-6 space-y-3 h-fit">
        <h2 className="text-lg text-center">{note.title}</h2>
        <div className="flex space-x-4">
          <time
            dateTime={note.createdAt}
            className=" right-0  p-1.5 text-sm rounded-lg  border border-secondary"
          >
            Created: {getRelativeTime(note.createdAt)}
          </time>
          <time
            dateTime={note.createdAt}
            className=" right-0 p-1.5 text-sm rounded-lg  border border-accent"
          >
            Updated: {getRelativeTime(note.updatedAt)}
          </time>
        </div>
      </div>
      <form
        className="flex flex-col h-full mx-1 mt-4 space-y-4"
        onSubmit={onUpdate}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="flex-shrink-0 w-full input input-bordered"
        />

        {edit ? (
          <>
            <div className="flex flex-col">
              <Toolbar
                commandController={commandController}
                textController={textController}
              />
              <textarea
                className="textarea min-h-[480px] md:min-h-[580px] textarea-bordered rounded-tl-none"
                ref={ref}
                placeholder="I'm a markdown editor"
              />
            </div>

            {/* <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea min-h-[480px] sm:min-h-[560px] textarea-bordered"
            placeholder="Markdown supported content"
            rows={8}
            ></textarea> */}
          </>
        ) : (
          <div className="relative w-full">
            <div
              className="min-h-[242px] max-w-none prose prose-img:text-center prose-img:w-80 prose-base lg:prose-lg px-4 py-2 textarea textarea-bordered h-full"
              dangerouslySetInnerHTML={{ __html: md.render(content) }}
            ></div>
            <label
              tabIndex={0}
              title="edit"
              onClick={() => setEdit(true)}
              className="absolute z-10 p-2 rounded-full cursor-pointer bg-accent-content border-accent-content top-4 right-4"
            >
              <svg
                className="text-accent w-7 h-7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.636 1.658a.875.875 0 0 1 1.238 0l4.95 4.95a.875.875 0 0 1 0 1.237L8.674 25.994a.875.875 0 0 1-.618.256h-4.95a.875.875 0 0 1-.875-.875v-4.95c0-.232.092-.454.256-.618l18.15-18.15Zm.619 1.856L3.981 20.788V24.5h3.712L24.967 7.226l-3.712-3.712Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.687 6.607a.875.875 0 0 1 1.237 0l4.95 4.95a.875.875 0 1 1-1.238 1.237l-4.95-4.95a.875.875 0 0 1 0-1.237Z"
                  fill="currentColor"
                />
              </svg>
            </label>
          </div>
        )}
        {edit && (
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setEdit(false)}
              className={`btn btn-accent px-8 ${loading && "loading"}`}
            >
              Cancel
            </button>
            <button className={`btn btn-primary px-8 ${loading && "loading"}`}>
              Update
            </button>
          </div>
        )}
      </form>
    </>
  );
};

IndividualNotePage.Layout = BaseLayout;

export default IndividualNotePage;
