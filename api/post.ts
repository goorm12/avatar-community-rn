import { CreatePostDto, CreateVoteDto, Post, VoteOption } from "@/types";
import { axiosInstance } from "./axios";

async function createPost(body: CreatePostDto) {
  const { data } = await axiosInstance.post("/posts", body);

  return data;
}

async function getPosts(page = 1): Promise<Post[]> {
  const { data } = await axiosInstance.get(`/posts?page=${page}`);

  return data;
}

async function deletePost(postId: number): Promise<number> {
  const { data } = await axiosInstance.delete(`/posts/${postId}`);
  return data;
}

async function getPost(id: number): Promise<Post> {
  const { data } = await axiosInstance.get(`/posts/${id}`);

  return data;
}

type RequestUpdatePost = {
  postId: number;
  body: CreatePostDto;
};

async function updatePost({ postId, body }: RequestUpdatePost): Promise<Post> {
  const { data } = await axiosInstance.patch(`/posts/${postId}`, body);

  return data;
}

async function createVote({
  postId,
  voteOptionId,
}: CreateVoteDto): Promise<{ postId: number; voteOption: VoteOption }> {
  const { data } = await axiosInstance.post(
    `/posts/${postId}/vote/${voteOptionId}`
  );

  return data;
}

async function likePost(postId: number): Promise<number> {
  const { data } = await axiosInstance.post(`/likes/${postId}`);

  return data;
}

export {
  createPost,
  createVote,
  deletePost,
  getPost,
  getPosts,
  likePost,
  updatePost,
};
