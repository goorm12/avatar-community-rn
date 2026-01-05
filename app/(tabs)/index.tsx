import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBoxContainer}>
        <Box />
        <Box />
        <Box />
      </View>
      <View style={styles.middleBoxContainer}>
        <Box />
        <Box />
        <Box />
      </View>
      <View style={styles.bottomBoxContainer}>
        <Box />
        <Box />
        <Box />
      </View>
    </SafeAreaView>
  );
}

function Box() {
  return <View style={styles.box} />;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
  topBoxContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 5,
  },
  middleBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  bottomBoxContainer: {
    flexDirection: "row",
    gap: 5,
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: "red",
  },
});
