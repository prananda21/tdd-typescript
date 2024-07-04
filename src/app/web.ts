import express from "express";
import { publicRouter } from "../router/api-router";
import { errorMiddleware } from "../middleware/error-middleware";

export const web = express();
web.use(express.json());
web.use(publicRouter);
web.use(errorMiddleware);
