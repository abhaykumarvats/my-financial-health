import { Models } from "appwrite";

export type IDocument = Omit<Models.Document, keyof Models.Document>;
