import React, { useState } from "react";

import toast from "react-hot-toast";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { api } from " /utils/api";
import { PostView } from " /components/postview";
import { PageLayout } from " /components/layout";
import { LoadingPage, LoadingSpinner } from " /components/loading";

dayjs.extend(relativeTime);

const CreatePostWizard = () => {
  const { user } = useUser();
  const ctx = api.useContext();
  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: async () => {
      setInput("");
      await ctx.posts.getAll.invalidate();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const [input, setInput] = useState("");

  if (!user) return null;

  return (
    <div className="flex w-full gap-3">
      <UserButton
        appearance={{
          elements: {
            userButtonAvatarBox: {
              width: 56,
              height: 56,
            },
          },
        }}
      />

      <input
        placeholder="Type some emojis!"
        className="grow bg-transparent p-2 outline-none focus:ring-1"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          (e.key === "Enter" || e.key === "NumpadEnter") &&
            mutate({ content: input });
        }}
        disabled={isPosting}
      />

      {input !== "" && !isPosting && (
        <button onClick={() => mutate({ content: input })}>Post</button>
      )}

      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-col">
      {data.map((fullPost) => (
        <PostView key={fullPost.post.id} {...fullPost} />
      ))}
    </div>
  );
};

export default function Home() {
  const { isLoaded: userLoaded, isSignedIn } = useUser();
  api.posts.getAll.useQuery();

  if (!userLoaded) return <div />;

  return (
    <PageLayout>
      <div className="flex border-b border-slate-400 p-4">
        {!!isSignedIn && <CreatePostWizard />}

        {!isSignedIn && (
          <div className="flex justify-center">
            <SignInButton mode="modal">Sign in</SignInButton>
          </div>
        )}
      </div>

      <Feed />
    </PageLayout>
  );
}
