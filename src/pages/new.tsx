import { FormEvent, useState } from "react";
import BaseLayout from "../components/core/layouts/BaseLayout";
import { ExtendedNextPage } from "../next";
import toast from "react-hot-toast";
import Router from "next/router";
import axios from "../lib/axios";
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
const Toolbar = dynamic(() => import("../components/editor/Toolbar"));

const NewNotePage: ExtendedNextPage = () => {
  const [title, setTitle] = useState<string | undefined>("");
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

  const onUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post<{ _id?: string }>(
        `/notes/`,

        { title, content: ref.current?.value }
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

        {/* Enable Designated Markdown editor */}
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

        {/* Enable simple textarea */}
        {/* <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea textarea-bordered"
          placeholder="Markdown supported content"
          rows={8}
        ></textarea> */}

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
