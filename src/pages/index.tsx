import React from "react";
import Head from "next/head";

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { api } from "../utils/api";

export default function Home() {
  const user = useUser();
  const { data } = api.posts.getAll.useQuery();
  console.log("post", data);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>{user.user?.firstName}</div>

        {!!user.isSignedIn && <SignOutButton>Sign out</SignOutButton>}

        {!user.isSignedIn && <SignInButton mode="modal">Sign in</SignInButton>}

        <div>
          {data?.map((post) => (
            <div key={post.id}>{post.content}</div>
          ))}
        </div>
      </main>
    </>
  );
}
