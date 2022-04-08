import create from "zustand";

const useTokenStore = create<{
  authToken?: string;
  logOut: () => void;
  setAuthToken: (token: string) => void;
}>((set) => ({
  authToken:
    typeof window !== "undefined"
      ? localStorage.getItem("nonic-token") || ""
      : "",

  setAuthToken: (token: string) => {
    set((state) => ({ ...state, authToken: token }));
    localStorage.setItem("nonic-token", token);
  },

  logOut: () => {
    set((state) => ({ ...state, authToken: undefined }));
    localStorage.removeItem("nonic-token");
  }
}));

export default useTokenStore;
