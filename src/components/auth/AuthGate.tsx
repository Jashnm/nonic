import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import useTokenStore from "../../hooks/useAuthToken";
import axios from "../../lib/axios";
import Axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const AuthGate = () => {
  const [loading, setLoading] = useState(false);
  const setAuthToken = useTokenStore((state) => state.setAuthToken);
  const [error, setError] = useState<string | null>(null);
  const [forgotPin, setForgotPin] = useState(false);
  const [secretCode, setSecretCode] = useState("");
  const [newPin, setNewPin] = useState("");
  const [showPin, setShowPin] = useState(false);

  const [pin, setPin] = useState({
    n1: "",
    n2: "",
    n3: "",
    n4: "",
    n5: "",
    n6: ""
  });
  const handleChange = (place: string, e: ChangeEvent<HTMLInputElement>) => {
    setPin((prev) => ({ ...prev, [place]: e.target.value }));
  };

  const changeFocus = async (el: KeyboardEvent<HTMLInputElement>) => {
    const key = el.key;

    const completePin = `${pin.n1}${pin.n2}${pin.n3}${pin.n4}${pin.n5}${pin.n6}`;

    if (completePin.length === 6) {
      try {
        const { data } = await axios.post("/auth/login", {
          pin: completePin
        });
        setAuthToken(data.token);
      } catch (error) {
        if (Axios.isAxiosError(error)) {
          if (error.response?.status === 403) {
            setError("INVALID_PIN");
          }
        }
      }
    }

    if (["Delete", "ArrowLeft", "Backspace"].includes(el.key)) {
      //@ts-ignore
      let yo = document.getElementsByName(`p${el.target.tabIndex - 1}`)[0];
      //@ts-ignore

      const prev = el.target.tabIndex - 1;

      if (prev > 0) {
        yo.focus();
      }
    } else if (
      el.code.includes("Digit") ||
      el.code.includes("Numpad") ||
      key === "ArrowRight"
    ) {
      //@ts-ignore
      const next = el.target.tabIndex + 1;
      //@ts-ignore
      let yo = document.getElementsByName(`p${el.target.tabIndex + 1}`)[0];
      //@ts-ignore

      if (next < 7) {
        yo.focus();
      }

      if (key === "ArrowRight") {
        return;
      }

      //@ts-ignore
      setPin((prev) => ({ ...prev, [`n${el.target.tabIndex}`]: +el.key }));
    }
  };

  const onSubmitNewPin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/auth/change-pin", { pin: newPin, secret: secretCode });

      toast.success("Success!");
      setForgotPin(false);
      setPin({ n1: "", n2: "", n3: "", n4: "", n5: "", n6: "" });
      setNewPin("");
      setSecretCode("");
    } catch (error) {
      //@ts-ignore
      console.log(error.response);

      toast.error("Error!");
    }
  };

  const togglePinShow = () => {
    setShowPin((x) => !x);
  };
  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center bg-neutral">
      {!forgotPin ? (
        <div className="flex space-x-2">
          <input
            name="p1"
            type="text"
            autoComplete="off"
            className="w-10 h-10 input"
            value={pin.n1}
            itemID="1"
            onChange={(e) => handleChange("n1", e)}
            tabIndex={1}
            maxLength={1}
            onKeyUp={(e) => changeFocus(e)}
          />
          <input
            name="p2"
            type="text"
            autoComplete="off"
            className="w-10 h-10 input"
            value={pin.n2}
            itemID="2"
            onChange={(e) => handleChange("n2", e)}
            tabIndex={2}
            maxLength={1}
            onKeyUp={(e) => changeFocus(e)}
          />
          <input
            name="p3"
            type="text"
            autoComplete="off"
            className="w-10 h-10 input"
            value={pin.n3}
            itemID="3"
            onChange={(e) => handleChange("n3", e)}
            tabIndex={3}
            maxLength={1}
            onKeyUp={(e) => changeFocus(e)}
          />
          <input
            name="p4"
            type="text"
            autoComplete="off"
            className="w-10 h-10 input"
            value={pin.n4}
            itemID="4"
            onChange={(e) => handleChange("n4", e)}
            tabIndex={4}
            maxLength={1}
            onKeyUp={(e) => changeFocus(e)}
          />
          <input
            name="p5"
            type="text"
            autoComplete="off"
            className="w-10 h-10 input"
            value={pin.n5}
            itemID="5"
            onChange={(e) => handleChange("n5", e)}
            tabIndex={5}
            maxLength={1}
            onKeyUp={(e) => changeFocus(e)}
          />
          <input
            name="p6"
            type="text"
            autoComplete="off"
            className="w-10 h-10 input"
            value={pin.n6}
            itemID="6"
            onChange={(e) => handleChange("n6", e)}
            tabIndex={6}
            maxLength={1}
            onKeyUp={(e) => changeFocus(e)}
          />
        </div>
      ) : (
        <form
          className="flex flex-col mt-2 max-w-xs w-full"
          onSubmit={onSubmitNewPin}
        >
          <div className="flex flex-col space-y-3">
            <input
              name="p6"
              type="password"
              autoComplete="off"
              className="input max-w-xs w-full"
              placeholder="Enter your secret code"
              value={secretCode}
              onChange={(e) => setSecretCode(e.target.value)}
            />
            <div className="input-group">
              <input
                name="p6"
                type={showPin ? "text" : "password"}
                autoComplete="off"
                className="input max-w-xs w-full"
                maxLength={6}
                placeholder="New 6 digit pin"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
              />
              <div className="btn-square flex justify-center items-center">
                {!showPin ? (
                  <AiOutlineEye size={24} onClick={togglePinShow} />
                ) : (
                  <AiOutlineEyeInvisible size={24} onClick={togglePinShow} />
                )}
              </div>
            </div>
          </div>

          <button className={`btn btn-accent mt-4 ${loading ? "loading" : ""}`}>
            Update
          </button>
        </form>
      )}
      <div className="mt-8" />
      {error && error === "INVALID_PIN" && (
        <div
          className="cursor-pointer text-sm"
          onClick={() => {
            setForgotPin(true);
            setError(null);
          }}
        >
          Forgot Pin?
        </div>
      )}
    </main>
  );
};

export default AuthGate;
