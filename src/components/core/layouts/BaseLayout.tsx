import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import NewNoteModal from "../../modals/NewNoteModal";
import ThemeDropdown from "../../ThemeDropdown";

const BaseLayout: React.FC = ({ children }) => {
  const { pathname } = useRouter();
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-col min-h-screen  h-screen antialiased mx-auto sm:px-5">
      <div className="w-full relative max-h-12 py-12 h-full flex items-center justify-center ">
        <div className="fixed top-0 sm:backdrop-blur-sm py-6 px-10 w-full flex flex-row items-center justify-between">
          <ThemeDropdown />
          <Link href="/">
            <a className="text-lg font-semibold tracking-wider">Nonic</a>
          </Link>
        </div>
      </div>

      {pathname !== "/" && (
        <label
          tabIndex={0}
          className="bg-accent-content fixed sm:hidden border-accent-content bottom-10 z-10 right-10 btn rounded-full p-2 "
        >
          <IoAddOutline size={28} className="text-accent" onClick={() => {}} />
        </label>
      )}
      <div className="max-w-[1600px] w-full mx-auto relative h-full">
        <div className="flex items-center justify-center">
          <input
            onClick={() => {
              setOpen((x) => !x);
            }}
            type="text"
            placeholder="Type here"
            className="input z-10 absolute hidden sm:block sm:top-6 modal-button w-full max-w-sm sm:max-w-xl lg:max-w-4xl input-bordered h-14"
          />
        </div>
        {children}
      </div>
      {open && (
        <NewNoteModal inputRef={inputRef} onClose={() => setOpen(false)} />
      )}
    </div>
  );
};

export default BaseLayout;
