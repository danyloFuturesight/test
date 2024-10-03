import React, { useState, useRef } from "react";
import { headsArrayInFeet } from "./constants/heads";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";

const { width: screenWidth } = Dimensions.get("window");

const CarouselTest = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Стан для збереження індексу елемента
  const carouselRef = useRef(null);

  const renderItem = ({ item }) => (
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

  const handleSnapToItem = (index) => {
    const actualIndex = index % headsArrayInFeet.length; // Коректний індекс з урахуванням циклічності
    setCurrentIndex(actualIndex); // Оновлюємо індекс елемента в центрі
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={headsArrayInFeet}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth / 20} // Встановлюємо ширину елемента для лінійки
        layout={"default"}
        inactiveSlideScale={1} // Без змін масштабу для неактивних слайдів
        inactiveSlideOpacity={1} // Прозорість для неактивних слайдів
        // enableSnap={true} // Вмикаємо дотягування до найближчого елемента
        snapToAlignment="center" // Вирівнюємо елемент по центру
        decelerationRate="fast" // Швидке гальмування для плавного дотягування
        scrollEnabled={true} // Дозволяємо скрол вручну
        onSnapToItem={(index) => handleSnapToItem(index)} // Оновлюємо індекс, коли скрол завершено
        loop={true} // Вмикаємо циклічний скрол
        slideStyle={{ justifyContent: "flex-end", gap: 30 }}
        contentContainerStyle={{ alignItems: "center", gap: 30 }}
        onScroll={(e) => {
          //   const offset = e.nativeEvent.contentOffset.x;
          //   const index = Math.round(offset / (screenWidth / 20)); // Розраховуємо індекс вручну
          //   setCurrentIndex(index % headsArrayInFeet.length); // Оновлюємо індекс вручну
        }}
        scrollEventThrottle={16} // Зменшуємо затримку для коректного відстеження скролу
      />
      <View style={styles.indicatorContainer}>
        <View style={styles.indicatorCircle}>
          <Text style={styles.indicatorText}>
            {headsArrayInFeet[currentIndex - 3]?.name || "N/A"}{" "}
            {/* Відображаємо ім'я поточного елемента */}
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
    elevation: 6,
    marginHorizontal: 100,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    justifyContent: "flex-end", // Вирівнювання каруселі внизу
    alignItems: "center",
  },
  itemContainer: {
    alignItems: "center", // Центрування елементів
    justifyContent: "flex-start", // Вирівнювання позначок зверху
  },
  tick: {
    width: 2,
    backgroundColor: "black",
    marginTop: 5, // Коригуємо відступи для позначок
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
    marginBottom: 10, // Позиціюємо текст над позначками
  },
  indicatorContainer: {
    position: "absolute",
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
