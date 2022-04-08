import useSWR from "swr";
import { IUser } from "../models/User";
import useAuthToken from "./useAuthToken";

interface CurrentUserResponse {
  user: IUser;
}

export default function useUser() {
  const authToken = useAuthToken((state) => state.authToken);
  const { data, mutate, error } = useSWR<CurrentUserResponse>(
    authToken ? "/api/profile" : null
  );

  const loading = !data && !error;
  const loggedOut = !authToken || !!error;

  return {
    loading,
    loggedIn: !loggedOut,
    user: data?.user,
    mutate,
    error
  };
}
