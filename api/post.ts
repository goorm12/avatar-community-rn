import { CreatePostDto } from "@/types";
import { axiosInstance } from "./axios";

async function createPost(body: CreatePostDto) {
  const { data } = await axiosInstance.post("/posts", body);
  console.log("data", data);
  return data;
}

export { createPost };
