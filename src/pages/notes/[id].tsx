import { FormEvent, useEffect, useState } from "react";
import BaseLayout from "../../components/core/layouts/BaseLayout";
import { INote } from "../../models/Note";
import { ExtendedNextPage } from "../../next";
import md from "../../utils/markdown";
import toast from "react-hot-toast";
import { getRelativeTime } from "../../utils/dayjs";
import Spinner from "../../components/core/Spinner";
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
import ConfirmNoteDeleteModal from "../../components/modals/ConfirmNoteDeleteModal";
import axios from "../../lib/axios";

const IndividualNotePage: ExtendedNextPage = () => {
  const { id } = Router.query;
  const { data, error, mutate } = useSwr<{ note: INote }>(
    id ? `/notes/${id}` : null,
    { refreshInterval: 0, revalidateOnMount: true }
  );

  const note = data?.note;

  const [title, setTitle] = useState<string | undefined>("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showDeletionModal, setShowDeletionModal] = useState(false);
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
    if (ref && ref.current) {
      ref.current.style.height = "480px";
      const scrollHeight = ref.current.scrollHeight;
      ref.current.style.height = scrollHeight + "px";
    }
  }, [content]);

  useEffect(() => {
    if (data && data.note) {
      setTitle(data.note.title);
      setContent(data.note.content);
    }
  }, [data, setTitle]);

  if (!data && !error) {
    return (
      <div className="flex flex-col items-center pb-6 space-y-3 h-fit">
        <Spinner />
      </div>
    );
  }

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
    const content = ref.current?.value;
    try {
      await axios.put(`/notes/${note._id}`, {
        title,
        content
      });
      mutate();
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
          readOnly={!edit ? true : false}
        />
        {/* <button
          type="button"
          onClick={() => {
            let msg = new SpeechSynthesisUtterance();
            msg.text = md.render(note.content);

            const voices = speechSynthesis.getVoices();
            msg.voice =
              voices.find((x) => x.name.includes("India")) || voices[0];
            window.speechSynthesis.speak(msg);
          }}
        >
          Speak
        </button> */}

        {edit ? (
          <>
            <div className="flex flex-col">
              <Toolbar
                commandController={commandController}
                textController={textController}
              />
              <textarea
                className="textarea min-h-[480px] textarea-bordered rounded-tl-none"
                ref={ref}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="I'm a markdown editor"
              />
            </div>
          </>
        ) : (
          <div className="relative group w-full">
            <div
              className="min-h-[242px] max-w-none prose prose-img:text-center prose-img:w-80 prose-base lg:prose-lg px-4 py-2 textarea textarea-bordered h-full"
              dangerouslySetInnerHTML={{ __html: md.render(data.note.content) }}
            ></div>
            <label
              tabIndex={0}
              title="edit"
              onClick={() => setEdit(true)}
              className="absolute z-10 p-2 rounded-full hidden group-hover:block cursor-pointer bg-accent-content bg-opacity-10 border-accent-content top-4 right-4"
            >
              <svg
                className="text-accent-content w-7 h-7"
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
            <label
              tabIndex={0}
              title="delete"
              onClick={() => setShowDeletionModal(true)}
              className="absolute z-10 p-2 rounded-full hidden group-hover:block cursor-pointer bg-accent-content bg-opacity-10 border-accent-content top-20 right-4"
            >
              <svg
                className="text-accent-content w-7 h-7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.375 5.833c0-.483.392-.875.875-.875h17.5c.483 0 .875.392.875.875v19.834a.875.875 0 0 1-.875.875H5.25a.875.875 0 0 1-.875-.875V5.833Zm1.75.875v18.084h15.75V6.708H6.125Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.667 10.792c.483 0 .875.392.875.875v7.583a.875.875 0 0 1-1.75 0v-7.583c0-.483.392-.875.875-.875ZM16.333 10.792c.483 0 .875.392.875.875v7.583a.875.875 0 1 1-1.75 0v-7.583c0-.483.392-.875.875-.875ZM1.458 5.833c0-.483.392-.875.875-.875h23.333a.875.875 0 1 1 0 1.75H2.333a.875.875 0 0 1-.875-.875Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.484 1.913a.875.875 0 0 1 .768-.455h5.534c.322 0 .619.177.771.461l1.88 3.5a.875.875 0 0 1-.77 1.29H9.332a.875.875 0 0 1-.767-1.296l1.918-3.5Zm1.286 1.295-.96 1.75h6.393l-.94-1.75H11.77Z"
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
      {showDeletionModal && (
        <ConfirmNoteDeleteModal
          id={Router.query.id as string}
          onClose={() => {
            setShowDeletionModal(false);
            Router.push("/notes");
          }}
        />
      )}
    </>
  );
};

IndividualNotePage.Layout = BaseLayout;

export default IndividualNotePage;
