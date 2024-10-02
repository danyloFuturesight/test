import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LoopFlatList from "./test";

export default function App() {
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <LoopFlatList></LoopFlatList>
        <LoopFlatList></LoopFlatList>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
});
