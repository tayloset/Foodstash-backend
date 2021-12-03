import express from "express";
import { getClient } from "../db";
import Profile from "../models/Profile";

const foodstashRouter = express.Router();
const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

foodstashRouter.get("/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const client = await getClient();
    const results = await client
      .db()
      .collection<Profile>("profiles")
      .find({ uid: id })
      .toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

foodstashRouter.post("/:id", async (req, res) => {
  try {
    const newProfile: Profile = {
      uid: req.params.id,
      pantry: [],
      equipment: [],
      diet: {},
      intolerances: {},
      favorites: [],
    };
    const client = await getClient();
    await client.db().collection<Profile>("profiles").insertOne(newProfile);
    res.status(201).json(newProfile);
  } catch (err) {
    errorResponse(err, res);
  }
});

foodstashRouter.put("/:id/:category", async (req, res) => {
  try {
    const id: string = req.params.id;
    const category: string = req.params.category;
    const categoryData = req.body.updateData;
    const query: any = {};
    query[category] = categoryData;
    console.log(id, category, req.body, categoryData, query, query[category]);
    const client = await getClient();
    await client
      .db()
      .collection<Profile>("profiles")
      .updateOne({ uid: id }, { $push: query });
    const client1 = await getClient();
    const results = await client1
      .db()
      .collection<Profile>("profiles")
      .find({ uid: id })
      .toArray();
    res.status(201).json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default foodstashRouter;
