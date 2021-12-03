import { ObjectId } from "bson";

// interface Diet {}

// interface Intolerances {}

export default interface Profile {
  _id?: ObjectId;
  uid: string;
  pantry: string[];
  equipment: string[];
  diet: any;
  intolerances: any;
  favorites: string[];
}
