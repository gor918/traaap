import React from "react";

import Head from "next/head";
import { type AppType } from "next/app";

import { Toaster } from "react-hot-toast";

import { ClerkProvider } from "@clerk/nextjs";

import " /styles/globals.css";
import { api } from " /utils/api";
import Header from " /components/header";

const MyApp: AppType = ({ Component, pageProps }) => (
  <ClerkProvider {...pageProps}>
    <Head>
      <title>Traaap aaaapp</title>
      <meta name="description" content="X" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Toaster position="bottom-center" />
    <Header />
    <Component {...pageProps} />
  </ClerkProvider>
);

export default api.withTRPC(MyApp);
