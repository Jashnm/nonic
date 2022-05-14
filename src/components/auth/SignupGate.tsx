import React, { FormEvent, useState } from "react";
import useTokenStore from "../../hooks/useAuthToken";
import axios from "../../lib/axios";

const SignupGate = () => {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const setAuthToken = useTokenStore((state) => state.setAuthToken);

  const onSubmit = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post<{ loggedIn: boolean; token: string }>(
        "/auth/new",
        { name, pin }
      );
      setAuthToken(data.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <main className="h-screen w-screen flex items-center justify-center bg-neutral">
      <form
        className="flex flex-col space-y-3 max-w-xs w-full"
        onSubmit={onSubmit}
      >
        <input
          name="p1"
          type="text"
          autoComplete="off"
          className="input max-w-xs w-full"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          name="p6"
          type="text"
          autoComplete="off"
          className="input max-w-xs w-full"
          maxLength={6}
          placeholder="6 digit pin"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <button className={`btn btn-accent ${loading ? "loading" : ""}`}>
          Enter
        </button>
      </form>
    </main>
  );
};

export default SignupGate;
