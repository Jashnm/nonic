import { FormEvent, MutableRefObject, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const NewNoteModal: React.FC<{
  inputRef?: MutableRefObject<HTMLInputElement | null>;

  onClose: () => void;
}> = ({ inputRef, onClose }) => {
  const [title, setTitle] = useState<string | undefined>("");
  const [content, setContent] = useState<string | undefined>(
    "**Hello world!!!**"
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [, inputRef]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("api", {
        method: "POST",
        body: JSON.stringify({ title, content })
      });
      setLoading(false);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={`modal modal-open`}>
        <div className="modal-box relative max-w-3xl">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </button>

          <h2 className="ml-1 text-lg font-medium">Add Note</h2>
          <form className="flex mt-4 flex-col space-y-4" onSubmit={onSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="input w-full mx-0.5 input-bordered"
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
            <div className="flex justify-end">
              <button
                className={`btn btn-primary px-8 ${loading && "loading"}`}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewNoteModal;
