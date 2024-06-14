import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const invalidatePostsCount = () => {
  queryClient.invalidateQueries({
    exact: true,
    queryKey: ["postsCount"]
  });
};
