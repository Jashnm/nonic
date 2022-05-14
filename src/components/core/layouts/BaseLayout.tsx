import Link from "next/link";
import { useRouter } from "next/router";
import ThemeDropdown from "../../ThemeDropdown";
import AuthGate from "../../auth/AuthGate";
import SignupGate from "../../auth/SignupGate";
import useSWR from "swr";
import useTokenStore from "../../../hooks/useAuthToken";

const BaseLayout: React.FC = ({ children }) => {
  const { pathname, back, push } = useRouter();

  const authToken = useTokenStore((state) => state.authToken);
  const { data } = useSWR<{ exists: boolean }>("/anyone", {
    refreshInterval: 0
  });

  // const handleScroll = useCallback(() => {
  //   const el = document.querySelector(".nav-btns")!.classList;
  //   if (window.scrollY > 200) {
  //     if (!el.contains("bg-neutral")) el.add("bg-neutral");
  //   } else {
  //     el.remove("bg-neutral");
  //   }
  // }, []);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [handleScroll]);

  return (
    <>
      {!data?.exists ? (
        <SignupGate />
      ) : !authToken ? (
        <AuthGate />
      ) : (
        <div className="flex flex-col h-screen min-h-screen mx-auto antialiased sm:px-5">
          <div className="relative flex items-center justify-center w-full h-full py-12 max-h-12 ">
            <div className="fixed top-0 z-10 flex flex-row items-center justify-between w-full px-6 py-5 sm:backdrop-blur-sm sm:px-10">
              <div className="flex flex-row space-x-4 nav-btns sm:space-x-6 ">
                <ThemeDropdown />
                {pathname !== "/" && (
                  <label
                    tabIndex={0}
                    title="go back"
                    onClick={back}
                    className="z-10 w-12 px-2 rounded-full btn-accent h-7 btn "
                  >
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.508 14c0-.483.392-.875.875-.875h21a.875.875 0 1 1 0 1.75h-21A.875.875 0 0 1 2.508 14Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.002 6.381a.875.875 0 0 1 0 1.238L4.62 14l6.381 6.381a.875.875 0 1 1-1.237 1.238l-7-7a.875.875 0 0 1 0-1.238l7-7a.875.875 0 0 1 1.238 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </label>
                )}
              </div>
              <Link href="/">
                <a className="text-lg font-semibold tracking-wider">Nonic</a>
              </Link>
            </div>
          </div>

          {pathname !== "/" && (
            <label
              onClick={() => push("/new")}
              tabIndex={0}
              className="fixed z-10 px-2 rounded-full btn-accent sm:bottom-10 sm:right-10 right-5 bottom-10 btn "
            >
              <svg
                className="w-7 h-7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.037 4.958c.483 0 .874.393.873.876l-.021 16.334a.875.875 0 1 1-1.75-.002l.021-16.334c.001-.483.393-.874.877-.874Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.958 14c0-.483.392-.875.875-.875h16.334a.875.875 0 0 1 0 1.75H5.833A.875.875 0 0 1 4.958 14Z"
                  fill="currentColor"
                />
              </svg>
            </label>
          )}
          <div className="max-w-[1400px] w-full mx-auto relative h-full">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default BaseLayout;
