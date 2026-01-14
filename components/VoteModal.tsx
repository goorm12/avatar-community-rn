import { colors } from "@/constants";
import { VoteOption } from "@/types";
import { Feather } from "@expo/vector-icons";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import VoteInput from "./VoteInput";

export default function VoteModal() {
  const insets = useSafeAreaInsets();
  const { control, setValue } = useFormContext();
  const [isVoteOpen, voteOptions] = useWatch({
    control,
    name: ["isVoteOpen", "voteOptions"],
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "voteOptions",
  });

  const handleAppendVote = () => {
    const priorities = voteOptions.map(
      (vote: VoteOption) => vote.displayPriority
    );
    const nextPriorities = Math.max(...priorities) + 1;
    append({ displayPriority: nextPriorities, content: "" });
  };

  const handleSubmitVote = () => {
    if (voteOptions.length < 2) {
      Alert.alert("투표 항목을 2개이상 추가해주세요.", "");
      return;
    }

    setValue("isVoteAttached", true);
    setValue("isVoteOpen", false);
  };

  return (
    <Modal visible={isVoteOpen} animationType="slide">
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Pressable
            onPress={() => setValue("isVoteOpen", false)}
            style={styles.headerLeft}
          >
            <Feather name="arrow-left" size={28} color={colors.BLACK} />
          </Pressable>
          <Text style={styles.headerTitle}>투표</Text>
          <Text style={styles.headerRight} onPress={handleSubmitVote}>
            첨부
          </Text>
        </View>
        <KeyboardAwareScrollView
          contentContainerStyle={{ gap: 12, padding: 16 }}
        >
          {fields.map((field, index) => {
            return (
              <VoteInput
                key={field.id}
                index={index}
                onRemove={() => remove(index)}
              />
            );
          })}
          <Pressable onPress={handleAppendVote}>
            <Text style={styles.addVoteText}>+ 항목 추가</Text>
          </Pressable>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.WHITE },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.BLACK,
  },
  headerRight: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.ORANGE_600,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  addVoteText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.GRAY_500,
    textAlign: "center",
  },
});
