import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="m-auto flex h-full w-full flex-col border-x border-b border-slate-400 p-4 md:max-w-2xl">
      <Link href="/" className="text-4xl">
        🪤
      </Link>
    </header>
  );
};

export default Header;
