import axios from "../../lib/axios";
import { useState } from "react";

const ConfirmNoteDeleteModal: React.FC<{
  id: string;
  onClose: () => void;
}> = ({ id, onClose }) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      await axios.delete(`/notes/${id}`);
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

          <h2 className="ml-1 text-lg font-medium">Delete Note</h2>
          <div className="flex mt-4 flex-col space-y-4">
            You sure you want to delete this note? It is irreversible.
            <div className="flex justify-end mt-4">
              <button
                onClick={onSubmit}
                className={`btn btn-warning px-8 ${loading && "loading"}`}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmNoteDeleteModal;
