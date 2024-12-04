import { QueryClient } from "@tanstack/react-query";

export enum queries {
  sources = "sources",
}

export const queryClient = new QueryClient();
