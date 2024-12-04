import { Client, Databases, ID } from "appwrite";
import { databaseId, projectId } from "./constants";
import { IDocument } from "./types";

const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(projectId);

const databases = new Databases(client);

export const db = {
  async listDocuments(collectionId: string) {
    return await databases.listDocuments(databaseId, collectionId);
  },

  async createDocument(collectionId: string, data: IDocument) {
    return await databases.createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      data
    );
  },
};
