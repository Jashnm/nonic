import { useState } from "react";

const themes = [
  "light",
  "dark",
  "bumblebee",
  "cyberpunk",
  "cupcake",
  "synthwave",
  "halloween",
  "garden",
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
      <label
        onClick={() => setOpenDrawer(true)}
        tabIndex={0}
        className="bg-primary btn flex text-center h-7 w-12 items-center justify-center rounded-full px-2"
      >
        <svg className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.458 14C1.458 7.073 7.073 1.458 14 1.458 20.926 1.458 26.54 7.073 26.54 14c0 1.143-.65 1.89-1.456 2.357-.755.438-1.73.685-2.633.88-.279.06-.552.116-.82.171-.65.133-1.267.259-1.843.426-.819.238-1.351.51-1.634.83l-.655-.58.655.58c-.384.433-.612 1.03-.755 1.785-.103.538-.151 1.074-.202 1.64-.023.255-.047.516-.076.785-.086.792-.225 1.699-.666 2.408a2.547 2.547 0 0 1-.99.933c-.43.225-.923.327-1.466.327-6.927 0-12.542-5.616-12.542-12.542ZM14 3.208C8.04 3.208 3.208 8.04 3.208 14S8.04 24.792 14 24.792c.326 0 .527-.06.655-.128a.8.8 0 0 0 .314-.304c.208-.335.326-.872.413-1.675.022-.203.042-.425.063-.66.055-.6.117-1.277.235-1.902.17-.893.48-1.847 1.165-2.62.628-.71 1.573-1.093 2.456-1.35.649-.188 1.376-.336 2.054-.475.25-.051.495-.101.727-.151.911-.197 1.636-.4 2.126-.684.44-.255.583-.503.583-.843C24.791 8.04 19.96 3.208 14 3.208Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.708 8.167a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Zm2.625-.875a.875.875 0 1 0 0 1.75.875.875 0 0 0 0-1.75ZM6.708 10.5a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Zm2.625-.875a.875.875 0 1 0 0 1.75.875.875 0 0 0 0-1.75ZM7.292 18.083a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Zm2.625-.875a.875.875 0 1 0 0 1.75.875.875 0 0 0 0-1.75Z"
            fill="currentColor"
          />
        </svg>
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
