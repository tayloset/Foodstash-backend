import express from "express";
import { getClient } from "../db";
import Profile, { Diet, Intolerances } from "../models/Profile";

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
    const emptyDiet: Diet = {
      glutengree: false,
      ketogenic: false,
      vegetarian: false,
      lactovegetarian: false,
      ovovegetarian: false,
      pescetarian: false,
      paleo: false,
      primal: false,
      lowFODMAP: false,
      whole30: false,
    };
    const emptyIntolerances: Intolerances = {
      dairy: false,
      egg: false,
      gulten: false,
      grain: false,
      peanut: false,
      seafood: false,
      sesame: false,
      shellfish: false,
      soy: false,
      sulfite: false,
      treeNut: false,
      wheat: false,
    };
    const newProfile: Profile = {
      uid: req.params.id,
      pantry: [],
      equipment: [],
      diet: emptyDiet,
      intolerances: emptyIntolerances,
      favorites: [],
    };
    const client = await getClient();
    await client.db().collection<Profile>("profiles").insertOne(newProfile);
    res.status(201).json(newProfile);
  } catch (err) {
    errorResponse(err, res);
  }
});

// foodstashRouter.put("/:id/:category", async (req, res) => {
//   try {
//     const id: string = req.params.id;
//     const category: string = req.params.category;
//     const categoryData = req.body.updateData;
//     const query: any = {};
//     query[category] = categoryData;
//     console.log(id, category, req.body, categoryData, query, query[category]);
//     const client = await getClient();
//     if (typeof categoryData === "string") {
//       await client
//         .db()
//         .collection<Profile>("profiles")
//         .updateOne({ uid: id }, { $push: query });
//     } else {
//       await client
//         .db()
//         .collection<Profile>("profiles")
//         .updateOne({ uid: id }, { $set: query });
//     }
//     const client1 = await getClient();
//     const results = await client1
//       .db()
//       .collection<Profile>("profiles")
//       .find({ uid: id })
//       .toArray();
//     res.status(201).json(results);
//     console.log(results);
//   } catch (err) {
//     errorResponse(err, res);
//   }
// });

foodstashRouter.put("/:uid", async (req, res) => {
  try {
    const uid: string = req.params.uid;
    const updatedProfile: Profile = req.body;
    console.log(updatedProfile);
    const client = await getClient();
    const result = await client
      .db()
      .collection<Profile>("profiles")
      .replaceOne({ uid }, updatedProfile);
    if (result.modifiedCount) {
      res.status(200).json(updatedProfile);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    errorResponse(error, res);
  }
});

export default foodstashRouter;
