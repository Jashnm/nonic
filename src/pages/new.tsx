import React, { FormEvent, useState } from "react";
import BaseLayout from "../components/core/layouts/BaseLayout";
import { INote } from "../models/Note";
import { ExtendedNextPage } from "../next";

import toast from "react-hot-toast";
import Router from "next/router";
import axios from "../lib/axios";

const NewNotePage: ExtendedNextPage = () => {
  const [title, setTitle] = useState<string | undefined>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  const onUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post<{ _id?: string }>(
        `/notes/`,

        { title, content }
      );

      toast.success("Added!");
      Router.push(`/notes/${data._id}`);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <h2 className="text-center text-lg">Adding new Note</h2>
      <form className="flex mt-4 mx-1  flex-col space-y-4" onSubmit={onUpdate}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="input w-full  input-bordered"
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

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea textarea-bordered"
          placeholder="Markdown supported content"
          rows={8}
        ></textarea>

        <div className="flex space-x-4 justify-end">
          <button
            onClick={() => setEdit(false)}
            className={`btn btn-accent px-8 ${loading && "loading"}`}
          >
            Cancel
          </button>
          <button className={`btn btn-primary px-8 ${loading && "loading"}`}>
            Add
          </button>
        </div>
      </form>
    </>
  );
};

NewNotePage.Layout = BaseLayout;

export default NewNotePage;
