// CarouselTest.tsx
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { headsArrayInFeet } from "./constants/heads";
interface HeadItem {
  isMajorTick: boolean;
  name: string;
  value: number;
  id: number;
}

const { width: screenWidth } = Dimensions.get("window");

interface ScaleCarouselProps {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  data: HeadItem[];
  title: string;
}

const ScaleCarousel: React.FC<ScaleCarouselProps> = ({
  currentIndex,
  setCurrentIndex,
  data,
  title,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const itemWidth: number = 20;

  const cyclicData: HeadItem[] = [...data, ...data, ...data];

  const middleIndex: number = headsArrayInFeet.length;

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX: number = event.nativeEvent.contentOffset.x;
    const index: number = Math.round(offsetX / itemWidth);

    const targetX: number = index * itemWidth;
    scrollViewRef.current?.scrollTo({
      x: targetX,
      animated: true,
    });

    if (
      index < headsArrayInFeet.length ||
      index >= 2 * headsArrayInFeet.length
    ) {
      const jumpToIndex: number =
        (index % headsArrayInFeet.length) + headsArrayInFeet.length;
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: jumpToIndex * itemWidth,
          animated: false,
        });
        setCurrentIndex(jumpToIndex % headsArrayInFeet.length);
      }, 100);
    } else {
      setCurrentIndex(index % headsArrayInFeet.length);
    }
  };

  const renderItem = (item: HeadItem, index: number): JSX.Element => (
    <View key={index} style={[styles.itemContainer, { width: itemWidth }]}>
      {item.isMajorTick && <Text style={styles.valueText}>{item.name}</Text>}
      <View
        style={[
          styles.tick,
          item.isMajorTick ? styles.majorTick : styles.minorTick,
        ]}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{title}</Text>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth}
        decelerationRate="fast"
        onMomentumScrollEnd={handleScrollEnd}
        contentOffset={{ x: middleIndex * itemWidth, y: 0 }}
        contentContainerStyle={[
          styles.scrollViewContainer,
          { paddingHorizontal: (screenWidth - itemWidth) / 2 },
        ]}
      >
        {cyclicData.map(renderItem)}
      </ScrollView>
      <View style={styles.indicatorContainer}>
        <View style={styles.indicatorCircle}>
          <Text style={styles.indicatorText}>
            {headsArrayInFeet[currentIndex]?.name || "N/A"}
          </Text>
        </View>
        <View style={styles.indicatorLine}></View>
        <View style={styles.triangle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 6,
    marginHorizontal: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10,
  },
  headerText: {
    alignSelf: "flex-start",
    margin: 10,
    color: "gray",
    fontSize: 16,
  },
  triangle: {
    width: 0,
    height: 0,
    borderRadius: 3,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "black",
  },
  scrollViewContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  tick: {
    width: 2,
    backgroundColor: "gray",
    marginTop: 5,
  },
  majorTick: {
    height: 30,
    backgroundColor: "gray",
    borderRadius: 100,
  },
  minorTick: {
    height: 15,
    backgroundColor: "gray",
    borderRadius: 100,
  },
  valueText: {
    fontSize: 14,
    color: "gray",
    width: 30,
    textAlign: "center",
  },
  indicatorContainer: {
    position: "absolute",
    pointerEvents: "none",
    alignItems: "center",
    bottom: 10,
  },
  indicatorCircle: {
    width: 60,
    height: 30,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorLine: {
    width: 2,
    height: 30,
    backgroundColor: "black",
  },
  indicatorText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export { ScaleCarousel };
