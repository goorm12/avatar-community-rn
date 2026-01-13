import { CreateCommentDto } from "@/types";
import { axiosInstance } from "./axios";

async function createComment(body: CreateCommentDto) {
  const { data } = await axiosInstance.post("/comments", body);

  return data;
}

async function deleteComment(commentId: number) {
  const { data } = await axiosInstance.delete(`/comments/${commentId}`);

  return data;
}

export { createComment, deleteComment };
