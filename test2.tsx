import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { headsArrayInFeet } from "./constants/heads";

const { width: screenWidth } = Dimensions.get("window");

const CarouselTest = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const itemWidth = 20; // Зменшуємо ширину елемента вдвічі

  // Повторення даних для створення циклічного ефекту
  const cyclicData = [
    ...headsArrayInFeet,
    ...headsArrayInFeet,
    ...headsArrayInFeet,
  ];

  const middleIndex = headsArrayInFeet.length; // Починаємо в середині циклічних даних

  // Обробка закінчення скролу для точного фіксування
  const handleScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / itemWidth);

    if (
      index < headsArrayInFeet.length ||
      index >= 2 * headsArrayInFeet.length
    ) {
      const jumpToIndex =
        (index % headsArrayInFeet.length) + headsArrayInFeet.length;
      scrollViewRef.current.scrollTo({
        x: jumpToIndex * itemWidth,
        animated: false,
      });
      setCurrentIndex(jumpToIndex % headsArrayInFeet.length);
    } else {
      setCurrentIndex(index % headsArrayInFeet.length);
    }
  };

  const renderItem = (item, index) => (
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
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={20} // Фіксована прокрутка по елементам
        decelerationRate="fast" // Плавна анімація при зупинці скролу
        onMomentumScrollEnd={handleScrollEnd} // Обробка завершення прокрутки для оновлення індексу
        contentOffset={{ x: middleIndex * itemWidth, y: 0 }} // Починаємо з середини
        contentContainerStyle={[
          styles.scrollViewContainer,
          { paddingHorizontal: (screenWidth - itemWidth) / 2 }, // Динамічна адаптація для центрування
        ]}
      >
        {cyclicData.map(renderItem)}
      </ScrollView>
      <View style={styles.indicatorContainer}>
        <View style={styles.indicatorCircle}>
          <Text style={styles.indicatorText}>
            {headsArrayInFeet[currentIndex - 1]?.name || "N/A"}
          </Text>
        </View>
        <View style={styles.indicatorLine}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: "white",
    paddingHorizontal: 10,
    elevation: 6,
    marginHorizontal: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  scrollViewContainer: {
    justifyContent: "flex-end", // Центрування елементів у скролі
    alignItems: "flex-end",
  },
  itemContainer: {
    alignItems: "center", // Центрування елементів і тексту
    justifyContent: "flex-start",
    width: 20,
  },
  tick: {
    width: 2,
    backgroundColor: "black",
    marginTop: 5,
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
    marginBottom: 5,
    width: 30,
  },
  indicatorContainer: {
    position: "absolute",
    pointerEvents: "none",
    alignItems: "center",
  },
  indicatorCircle: {
    width: 50,
    height: 25,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "white",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorLine: {
    width: 2,
    height: 40,
    backgroundColor: "black",
  },
  indicatorText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export default CarouselTest;
