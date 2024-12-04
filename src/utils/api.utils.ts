import { Client, Databases, ID } from "appwrite";
import { Document } from "./types.utils";

const projectId = "674f6cd4002382476f18";
const databaseId = "674f6d1d002ded06b7f8";

const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(projectId);

const databases = new Databases(client);

export const db = {
  async list(collectionId: string) {
    return await databases.listDocuments(databaseId, collectionId);
  },

  async create(collectionId: string, data: Document) {
    return await databases.createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      data
    );
  },
};
