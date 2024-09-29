import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { publicProcedure, createContext, router } from "./trpc";
import { appRouter } from "./routes";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:3001" }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
app.listen(5001);
