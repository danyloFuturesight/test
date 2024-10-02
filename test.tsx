import React, { useRef, useState, useEffect } from "react";
import { FlatList, View, Text, StyleSheet, Platform } from "react-native";
import { headsArrayInFeet } from "./constants/heads";

const ITEM_WIDTH = 20;
const INITIAL_INDEX = headsArrayInFeet.length;

const RulerList = () => {
  const [listData] = useState([...headsArrayInFeet, ...headsArrayInFeet]);
  const flatListRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    flatListRef.current?.scrollToOffset({
      offset: ITEM_WIDTH * INITIAL_INDEX,
      animated: false,
    });
  }, []);

  const handleContainerLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        {item.isMajorTick && <Text style={styles.valueText}>{item.name}</Text>}
        <View
          style={[
            styles.tick,
            item.isMajorTick ? styles.majorTick : styles.minorTick,
          ]}
        />
      </View>
    );
  };

  const handleScrollIOS = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / ITEM_WIDTH);
    flatListRef.current?.scrollToOffset({
      offset: index * ITEM_WIDTH,
      animated: true,
    });
  };

  const handleMomentumScrollEndAndroid = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / ITEM_WIDTH);
    flatListRef.current?.scrollToOffset({
      offset: index * ITEM_WIDTH,
      animated: true,
    });
  };

  return (
    <View
      onLayout={handleContainerLayout}
      style={{
        marginHorizontal: 20,
        paddingHorizontal: 10,
        height: 150,
        borderRadius: 10,
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowColor: "black",
        backgroundColor: "white",
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
      }}
    >
      <FlatList
        ref={flatListRef}
        data={listData}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
        contentContainerStyle={styles.container}
        onMomentumScrollEnd={
          Platform.OS === "ios"
            ? handleScrollIOS
            : handleMomentumScrollEndAndroid
        }
        decelerationRate={Platform.OS === "android" ? 0.95 : "fast"}
        snapToInterval={Platform.OS === "ios" ? ITEM_WIDTH : null}
        snapToAlignment={Platform.OS === "ios" ? "center" : null}
        scrollEventThrottle={16}
      />
      {containerWidth > 0 && (
        <View
          style={{
            pointerEvents: "none",
            position: "absolute",
            bottom: 0,
            left: (containerWidth - 50) / 2,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 50,
              height: 25,
              borderRadius: 100,
              borderWidth: 2,
              borderColor: "black",
              backgroundColor: "white",
            }}
          ></View>
          <View
            style={{
              width: 2,
              height: 40,
              backgroundColor: "black",
            }}
          />
          <View
            style={{
              width: 0,
              height: 0,
              borderLeftWidth: 10,
              borderRightWidth: 10,
              borderBottomWidth: 10,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderBottomColor: "black",
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
  },
  itemContainer: {
    width: ITEM_WIDTH,
    paddingLeft: Platform.OS === "ios" ? 4 : 14,
  },
  tick: {
    width: 2,
    backgroundColor: "black",
    marginBottom: 5,
  },
  majorTick: {
    height: 30,
  },
  minorTick: {
    height: 15,
  },
  valueText: {
    fontSize: 12,
    color: "black",
    marginTop: 5,
    width: 30,
    position: "absolute",
    bottom: 40,
    left: -2,
  },
});

export default RulerList;
