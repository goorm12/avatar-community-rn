import { likePost } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKey } from "@/constants";
import { Post, Profile } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useLikePost() {
  return useMutation({
    mutationFn: likePost,
    onMutate: async (postId) => {
      // 요청 취소
      await queryClient.cancelQueries({
        queryKey: [queryKey.POST, queryKey.GET_POST, postId],
      });

      const user = queryClient.getQueryData<Profile>([
        queryKey.AUTH,
        queryKey.GET_ME,
      ]);
      const userId = Number(user?.id);

      const previousPost = queryClient.getQueryData<Post>([
        queryKey.POST,
        queryKey.GET_POST,
        postId,
      ]);
      const newPost = { ...previousPost };

      const likedIndex =
        previousPost?.likes.findIndex((like) => like.userId === userId) ?? -1;

      likedIndex >= 0
        ? newPost.likes?.splice(likedIndex, 1)
        : newPost.likes?.push({ userId });

      queryClient.setQueryData(
        [queryKey.POST, queryKey.GET_POST, postId],
        newPost
      );

      return { previousPost, newPost };
    },

    onError: (error, newPost, context) => {
      queryClient.setQueryData(
        [queryKey.POST, queryKey.GET_POST, context?.previousPost?.id],
        context?.previousPost
      );
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.POST, queryKey.GET_POST, variables],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKey.POST, queryKey.GET_POSTS],
      });
    },
  });
}
