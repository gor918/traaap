import superjson from "superjson";
import { createServerSideHelpers } from "@trpc/react-query/server";

import { prisma } from "../db";
import { appRouter } from "../api/root";

export const generateSSGHelper = () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson, // optional - adds superjson serialization
  });
