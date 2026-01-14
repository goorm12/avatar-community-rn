import { createVote } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKey } from "@/constants";
import { useMutation } from "@tanstack/react-query";

export default function useCreateVote() {
  return useMutation({
    mutationFn: createVote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.POST, queryKey.GET_POST, data.postId],
      });
    },
  });
}
