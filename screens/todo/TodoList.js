import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import FloatingButton from "../../components/UI/FloatingButton";

const CustomButton = ({ onPress, iconName, iconTitle, iconColor, title }) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.customButton}>
        <View style={styles.cbIconWrapper}>
          <Ionicons
            name={iconName}
            title={iconTitle}
            color={iconColor}
            size={30}
          />
        </View>
        <View style={styles.cbTitleWrapper}>
          <Text style={styles.cbTitle}>{title}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const TodoList = props => {
  let courseNames = useSelector(state => state.root.courses);
  let courseButtons = courseNames.map(({ courseCode, tint }) => {
    return (
      <CustomButton
        key={courseCode}
        title={courseCode}
        onPress={() => {
          console.log(tint, "tint");
          props.navigation.navigate("Course", {
            courseCode,
            tint
          });
        }}
        iconName="ios-list"
        iconColor="green"
        iconTitle={courseCode}
      />
    );
  });

  return (
    <View style={styles.container}>
      <CustomButton
        title="Today"
        onPress={() => {
          props.navigation.navigate("Today");
        }}
        iconName="md-sunny"
        iconColor="#9895d8"
        iconTitle="today"
      />
      <CustomButton
        title="Tasks"
        onPress={() => {
          props.navigation.navigate("Tasks");
        }}
        iconName="md-list-box"
        iconColor="#e05858"
        iconTitle="tasks"
      />
      {courseButtons}
      <FloatingButton
        onPress={() => {
          props.navigation.navigate("AddTodo", {});
        }}
        iconName={"ios-add"}
        iconTitle={"addTodo"}
        iconColor={"white"}
        right={0}
        bottom={0}
      />
    </View>
  );
};

TodoList.navigationOptions = props => {
  return {
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="menu"
          iconName="ios-menu"
          color={"black"}
          onPress={() => props.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerTitle: "Todo List"
  };
};

const styles = StyleSheet.create({
  customButton: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 1,
    elevation: 4,
    backgroundColor: "white"
  },
  cbIconWrapper: {
    flexBasis: "10%"
  },
  cbTitleWrapper: {
    flexBasis: "90%"
  },
  cbTitle: {
    fontSize: 18,
    fontWeight: "bold"
  },
  container: {
    flex: 1
  },
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

export default TodoList;
