import { ObjectId } from "bson";

export default interface Profile {
  _id?: ObjectId;
  uid: string;
  pantry: string[];
  equipment: string[];
  diet: string[];
  intolerances: string;
  favorites: string[];
}
