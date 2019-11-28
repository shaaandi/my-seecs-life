import React from "react";
import { View, TouchableNativeFeedback, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FloatingButton = ({
  onPress,
  iconName,
  iconTitle,
  iconColor,
  left,
  right,
  top,
  bottom
}) => {
  return (
    <View style={{ ...styles.floatingWrapper, left, right, top, bottom }}>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={styles.floatingButton}>
          <Ionicons
            name={iconName}
            title={iconTitle}
            color={iconColor}
            size={35}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingWrapper: {
    position: "absolute",
    padding: 30
  },
  floatingButton: {
    backgroundColor: "#85d1ed",
    width: 50,
    height: 50,
    borderRadius: 25,
    padding: 5,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default FloatingButton;
