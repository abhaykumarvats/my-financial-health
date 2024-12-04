import { Models } from "appwrite";

export type Document = Omit<Models.Document, keyof Models.Document>;
