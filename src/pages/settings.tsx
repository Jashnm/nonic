import React, { FormEvent, useEffect, useState } from "react";
import BaseLayout from "../components/core/layouts/BaseLayout";
import { ExtendedNextPage } from "../next";
import useUser from "../hooks/useUser";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import Axios from "axios";
import { AiOutlineEye } from "@react-icons/all-files/ai/AiOutlineEye";
import { AiOutlineEyeInvisible } from "@react-icons/all-files/ai/AiOutlineEyeInvisible";

const CardTemplate: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <div
      className={`card relative lg:max-w-sm sm:max-w-[280px] max-w-sm w-full self-start bg-base-300 shadow-xl`}
    >
      <div className={`card-body text-base-content`}>
        <h2 className="card-title">{title}</h2>
        {children}
      </div>
    </div>
  );
};

const PasswordTypeInput: React.FC<{
  setAllPins: React.Dispatch<
    React.SetStateAction<{
      oldPin: string;
      pin: string;
    }>
  >;
  type: string;
  done?: boolean;
}> = ({ setAllPins, type, done }) => {
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const addPin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPin(e.target.value);
    setAllPins((prev) => ({ ...prev, [type]: e.target.value }));
  };

  useEffect(() => {
    if (done) {
      setPin("");
    }
  }, [done]);
  return (
    <div className="input-group">
      <input
        name="p6"
        type={showPin ? "text" : "password"}
        autoComplete="off"
        className="input max-w-xs w-full"
        maxLength={6}
        placeholder={`${type === "oldPin" ? "Current" : "New"} 6 digit pin`}
        value={pin}
        onChange={addPin}
      />
      <div className="btn-square flex justify-center items-center">
        {!showPin ? (
          <AiOutlineEye size={24} onClick={() => setShowPin(!showPin)} />
        ) : (
          <AiOutlineEyeInvisible
            size={24}
            onClick={() => setShowPin(!showPin)}
          />
        )}
      </div>
    </div>
  );
};

const SettingsPage: ExtendedNextPage = () => {
  const { user } = useUser();

  const [name, setName] = useState("");
  const [pins, setAllPins] = useState({ oldPin: "", pin: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user?.name);
    }
  }, [user]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.put("/profile/pin", pins);
      toast.success("Updated!");
      setAllPins({ oldPin: "", pin: "" });
      setDone(true);
    } catch (error) {
      if (Axios.isAxiosError(error)) {
        console.log(error.response);

        toast.error(error.response?.data.message ?? "Error!");
      }
    }
  };
  return (
    <div>
      <h2 className="text-xl text-center mb-8">Hello {user?.name}</h2>
      <div className="flex flex-row flex-wrap items-center justify-center w-full gap-4 m-auto md:gap-8 sm:gap-6">
        <CardTemplate title="Edit Pin">
          <form
            className="flex flex-col mt-2 max-w-xs w-full"
            onSubmit={onSubmit}
          >
            <div className="flex flex-col space-y-3">
              <PasswordTypeInput
                setAllPins={setAllPins}
                done={done}
                type="oldPin"
              />
              <PasswordTypeInput
                setAllPins={setAllPins}
                done={done}
                type="newPin"
              />
            </div>

            <button
              className={`btn btn-accent mt-4 ${loading ? "loading" : ""}`}
            >
              Update
            </button>
          </form>
        </CardTemplate>
        <CardTemplate title="Edit Profile">
          <form
            className="flex flex-col mt-2 max-w-xs w-full"
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

            <button
              className={`btn btn-accent mt-4 ${loading ? "loading" : ""}`}
            >
              Update
            </button>
          </form>
        </CardTemplate>
      </div>
    </div>
  );
};

SettingsPage.Layout = BaseLayout;

export default SettingsPage;
