import "../styles/globals.css";
import type { AppProps } from "next/app";

import React, { useEffect, useState } from "react";
import { NextComponentType, NextPageContext } from "next";
import { LazyMotion, domMax } from "framer-motion";
import ThemeDropdown from "../components/ThemeDropdown";

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
    <LazyMotion features={domMax} strict>
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </LazyMotion>
  );
}

export default MyApp;
