import { initTRPC, TRPCError } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import jwt from "jsonwebtoken";
import { type } from "os";

const SECRET_KEY = "h7c4yr7rty78bwct78bc7t7ct87b4rx4ut89ny4v783";

// creating backend server
export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return { req, res };
};

// no context

type Context = Awaited<ReturnType<typeof createContext>>;
export const t = initTRPC.context<Context>().create();

// exporting router and procedures
export const router = t.router;
export const publicProcedure = t.procedure;
