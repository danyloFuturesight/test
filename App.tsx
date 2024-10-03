import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ScaleCarousel } from "./test2";
import { useState } from "react";
import { headsArrayInFeet } from "./constants/heads";

export default function App() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <View>
          <ScaleCarousel
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            title="HEAD (FT)"
            data={headsArrayInFeet}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignSelf: "center",
    justifyContent: "center",
  },
});
