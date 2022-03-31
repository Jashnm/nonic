import { useState } from "react";
import { RiPaintFill } from "react-icons/ri";

const themes = [
  "light",
  "dark",
  "bumblebee",
  "cyberpunk",
  "cupcake",
  "synthwave",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "luxury",
  "dracula"
];

const ThemeDropdown: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleThemeChange = (x: string) => {
    const el = document.querySelector("[data-theme]");

    el?.setAttribute("data-theme", x);
    localStorage.setItem("theme", x);
    setOpenDrawer(false);
  };
  return (
    <div className="dropdown">
      <label tabIndex={0} className="bg-accent btn rounded-full p-2 ">
        <RiPaintFill
          size={28}
          className="text-accent-content"
          onClick={() => setOpenDrawer(true)}
        />
      </label>
      {openDrawer && (
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {themes.map((x) => (
            <li key={x} onClick={() => handleThemeChange(x)}>
              <a>{x}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThemeDropdown;
