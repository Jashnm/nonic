import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";

const Gate = () => {
  const [pin, setPin] = useState({
    n1: "",
    n2: "",
    n3: "",
    n4: "",
    n5: "",
    n6: ""
  });
  const handleChange = (place: string, e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);

    setPin((prev) => ({ ...prev, [place]: e.target.value }));
  };

  const changeFocus = (el: KeyboardEvent<HTMLInputElement>) => {
    const key = el.key;

    if (["Delete", "ArrowLeft", "Backspace"].includes(el.key)) {
      //@ts-ignore
      let yo = document.getElementsByName(`p${el.target.tabIndex - 1}`)[0];
      //@ts-ignore

      const prev = el.target.tabIndex - 1;

      if (prev > 0) {
        yo.focus();
      }
    } else if (el.code.includes("Digit") || key === "ArrowRight") {
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
  return (
    <main className="h-screen w-screen flex items-center justify-center bg-neutral">
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
    </main>
  );
};

export default Gate;
