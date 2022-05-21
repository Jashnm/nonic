import useSWRInfinite from "swr/infinite";
import { INote } from "../models/Note";

type getNotesTypes = {
  perPage?: number;
};

export default function useNotes({ perPage = 3 }: getNotesTypes) {
  let queryString = `/notes?perPage=${perPage}`;

  const { data, error, mutate, size, setSize } = useSWRInfinite<{
    notes: INote[];
  }>((index) => `${queryString}&page=${index}`, {
    refreshInterval: 0,
    revalidateOnFocus: false
  });

  const loading = !data && !error;
  const isFetchingNextPage =
    loading || (size > 0 && data && typeof data[size - 1] === "undefined");

  const isEmpty = data?.[0]?.notes.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.notes.length < perPage);

  const fetchNextPage = () => {
    if (!isReachingEnd && !isFetchingNextPage && !error) {
      setSize((size) => size + 1);
    }
  };

  const flattenNotes = data?.flatMap((d) => d.notes) ?? [];

  return {
    loading,
    notes: flattenNotes,
    error,
    hasNextPage: !isReachingEnd,
    isFetchingNextPage,
    fetchNextPage,
    mutate,
    setSize,
    size
  };
}
