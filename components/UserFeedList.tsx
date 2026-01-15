import { colors } from "@/constants";
import useGetInfiniteUserPosts from "@/hooks/queries/useGetInfiniteUserPosts";
import { useScrollToTop } from "@react-navigation/native";
import { useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import FeedItem from "./FeedItem";

interface FeedListProps {
  userId: number;
}

export default function UserFeedList({ userId }: FeedListProps) {
  const {
    data: posts,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useGetInfiniteUserPosts(userId);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const ref = useRef<FlatList | null>(null);
  useScrollToTop(ref);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
  return (
    <FlatList
      ref={ref}
      data={posts?.pages.flat()}
      renderItem={({ item }) => <FeedItem post={item} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text>작성한 글이 없습니다.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
  emptyContainer: {
    backgroundColor: colors.WHITE,
    padding: 16,
    alignItems: "center",
  },
});
