import "../styles/globals.css";
import type { AppProps } from "next/app";

import React, { useEffect } from "react";
import { NextComponentType, NextPageContext } from "next";

const AnyComp: React.FC = ({ children }) => <>{children}</>;
function MyApp({
  Component,
  pageProps
}: AppProps & {
  Component: NextComponentType<NextPageContext, any, {}> & {
    Layout?: React.FC<{ pageProps: any }>;
  };
}) {
  const Layout = Component.Layout || AnyComp;
  return (
    <Layout pageProps={pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
