import { Client, Databases } from "appwrite";
import { projectId } from "./constants";

const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(projectId);

export const db = new Databases(client);
