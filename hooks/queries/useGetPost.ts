import { getPost } from "@/api/post";
import { queryKey } from "@/constants";
import { useQuery } from "@tanstack/react-query";

export default function useGetPost(id: number) {
  return useQuery({
    queryKey: [queryKey.POST, queryKey.GET_POST, id],
    queryFn: () => getPost(Number(id)),
    enabled: !!id,
  });
}
