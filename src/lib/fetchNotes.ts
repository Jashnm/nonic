import axios from "./axios";

export const fetchSingleNote = async () => {
  const res = await axios.get(`/api/notes`);

  return res;
};
