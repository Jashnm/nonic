import { NextPage } from "next";

export type ExtendedNextPage = NextPage<T> & { Layout?: React.FC };
