import create from "zustand";

const useTokenStore = create<{
  authToken?: string;
  logOut: () => void;
  setAuthToken: (token: string) => void;
}>((set) => ({
  authToken:
    typeof window !== "undefined"
      ? sessionStorage.getItem("nonic-token") || ""
      : "",

  setAuthToken: (token: string) => {
    set((state) => ({ ...state, authToken: token }));
    sessionStorage.setItem("nonic-token", token);
  },

  logOut: () => {
    set((state) => ({ ...state, authToken: undefined }));
    sessionStorage.removeItem("nonic-token");
  }
}));

export default useTokenStore;
