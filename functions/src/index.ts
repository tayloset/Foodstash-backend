import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import foodstashRouter from "./routes/foodstashRouter";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/profiles", foodstashRouter);
export const api = functions.https.onRequest(app);
// test
