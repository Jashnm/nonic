import { GetStaticPaths, GetStaticProps } from "next";
import React, { FormEvent, useState } from "react";
import BaseLayout from "../../components/core/layouts/BaseLayout";
import { INote } from "../../models/Note";
import { ExtendedNextPage } from "../../next";
import md from "../../utils/markdown";
import { MdEdit } from "react-icons/md";
import toast from "react-hot-toast";
import { getRelativeTime } from "../../utils/dayjs";

const IndividualNotePage: ExtendedNextPage = ({ note }: { note: INote }) => {
  const [title, setTitle] = useState<string | undefined>(note.title || "");
  const [content, setContent] = useState<string>(note.content || "");
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  const onUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`/api/notes/${note._id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content })
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
      <div className="flex h-fit flex-col items-center space-y-3 pb-6">
        <h2 className="text-center text-lg">{note.title}</h2>
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
        className="flex mt-4 mx-1 h-full flex-col space-y-4"
        onSubmit={onUpdate}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="input w-full flex-shrink-0 input-bordered"
        />
        {/* 
            <MDEditor
              value={value}
              onChange={setValue}
              hideToolbar={true}
              fullscreen={false}
              height={400}
              className="bg-primary"
              placeholder="Contnent in markdown"
            /> */}
        {edit ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea min-h-[480px] sm:min-h-[560px] textarea-bordered"
            placeholder="Markdown supported content"
            rows={8}
          ></textarea>
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
              className="bg-accent-content cursor-pointer absolute border-accent-content top-4 z-10 right-4 p-2 rounded-full"
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
          <div className="flex space-x-4 justify-end">
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

//@ts-ignore
export const getStaticPaths: GetStaticPaths = async () => {
  // Call an external API endpoint to get posts
  const res = await fetch(`${process.env.BASE_URL}/api/notes`);
  
  const notes = await res.json();

  if (res.status === 401) {
    return { paths: [], fallback: "blocking" };
  }

  const paths = notes.notes?.map((note: INote) => ({
    params: { id: note._id }
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/notes/${params?.id}`);

    if (res.status === 401) {
      return {
        props: {}
      };
    }
    const note = await res.json();

    return {
      props: note
    };
  } catch (error) {
    console.log(error);

    return {
      props: {} // will be passed to the page component as props
    };
  }
};
