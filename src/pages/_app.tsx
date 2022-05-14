import "../styles/globals.css";
import type { AppProps } from "next/app";

import React, { useEffect, useState } from "react";
import { NextComponentType, NextPageContext } from "next";
import { LazyMotion, domMax } from "framer-motion";
import ThemeDropdown from "../components/ThemeDropdown";
import dynamic from "next/dynamic";
import { SWRConfig } from "swr";
import axios from "../lib/axios";
const Toaster = dynamic(
  // @ts-ignore
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);

const AnyComp: React.FC = ({ children }) => <>{children}</>;
function MyApp({
  Component,
  pageProps
}: AppProps & {
  Component: NextComponentType<NextPageContext, any, {}> & {
    Layout?: React.FC<{ pageProps: any }>;
  };
}) {
  useEffect(() => {
    const el = document.querySelector("[data-theme]");

    const theme = localStorage.getItem("theme") || "dark";
    el?.setAttribute("data-theme", theme);
  }, []);
  const Layout = Component.Layout || AnyComp;
  return (
    <SWRConfig
      value={{
        refreshInterval: 5000,
        fetcher: (resource, init) => axios.get(resource).then((res) => res.data)
      }}
    >
      <LazyMotion features={domMax} strict>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
        <Toaster
          position="bottom-center"
          toastOptions={{
            className: "text-sm bg-accent text-accent-content font-medium"
          }}
        />
      </LazyMotion>
    </SWRConfig>
  );
}

export default MyApp;
