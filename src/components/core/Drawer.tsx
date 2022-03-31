import { AnimatePresence, m } from "framer-motion";

const Drawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  return (
    <AnimatePresence>
      <m.div className="drawer h-screen absolute w-full rounded">
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isOpen}
        />

        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            className="drawer-overlay"
            onClick={onClose}
          ></label>
          <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </m.div>
    </AnimatePresence>
  );
};

export default Drawer;
