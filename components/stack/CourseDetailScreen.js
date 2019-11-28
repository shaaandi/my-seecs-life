import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableNativeFeedback,
  ScrollView
} from "react-native";
import { useSelector } from "react-redux";

// importing tabs components;
import Current from "./courseDetailComponents/Current";
import Todos from "./courseDetailComponents/Todos";
import Schedule from "./courseDetailComponents/Schedule";

const CustomButton = props => {
  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View style={{ padding: 5, ...props.style }}>
        <Text style={{ ...props.textStyle }}>{props.title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const CURRENT = "CURRENT";
const SCHEDULE = "SCHEDULE";
const TODO = "TODO";

const renderTab = ({ section, id, navigation }) => {
  switch (section) {
    case CURRENT:
      return <Current id={id} navigation={navigation} />;
      break;
    case SCHEDULE:
      return <Schedule id={id} />;
    case TODO:
      return <Todos courseCode={id} />;
    default:
      return (
        <View>
          <Text>Notihng </Text>
        </View>
      );
  }
};
// only id or courseCode will be given as props, and it will render the whole screen
const CourseDetailScreen = props => {
  let id = props.navigation.getParam("id");
  let [section, setSection] = useState(CURRENT);
  // section can be -- CURRENT or time or TODO;
  //   extracting the required course from the store - redux;
  let { courses } = useSelector(state => state.root);

  let course = courses.find(course => course.courseCode === id);
  let { title, tint } = course;
  return (
    <ScrollView>
      <View style={{ backgroundColor: tint, ...styles.heading }}>
        <Text style={styles.headingText}>{title}</Text>
      </View>
      <View style={{ backgroundColor: tint, ...styles.tabButtons }}>
        <View
          style={
            section === CURRENT
              ? {
                  borderBottomColor: "white",
                  borderBottomWidth: 3,
                  ...styles.tabButton
                }
              : {
                  ...styles.tabButton
                }
          }
        >
          <CustomButton
            textStyle={{ color: "white", fontSize: 16 }}
            title={"CURRENT"}
            backgroundColor={tint}
            onPress={() => setSection(CURRENT)}
          />
        </View>
        <View
          style={
            section === SCHEDULE
              ? {
                  borderBottomColor: "white",
                  borderBottomWidth: 3,
                  ...styles.tabButton
                }
              : {
                  ...styles.tabButton
                }
          }
        >
          <CustomButton
            textStyle={{ color: "white", fontSize: 16 }}
            title={"SCHEDULE"}
            backgroundColor={tint}
            onPress={() => setSection(SCHEDULE)}
          />
        </View>
        <View
          style={
            section === TODO
              ? {
                  borderBottomColor: "white",
                  borderBottomWidth: 3,
                  ...styles.tabButton
                }
              : {
                  ...styles.tabButton
                }
          }
        >
          <CustomButton
            textStyle={{ color: "white", fontSize: 16 }}
            title={"TODOS"}
            backgroundColor={tint}
            onPress={() => setSection(TODO)}
          />
        </View>
      </View>
      <View>{renderTab({ section, id, navigation: props.navigation })}</View>
    </ScrollView>
  );
};

CourseDetailScreen.navigationOptions = props => {
  let id = props.navigation.getParam("id");
  let tint = props.navigation.getParam("tint");
  return {
    headerTitle: id,
    headerStyle: {
      backgroundColor: tint
    }
  };
};

const styles = StyleSheet.create({
  heading: {
    paddingVertical: 30,
    paddingHorizontal: 10
  },
  headingText: {
    fontSize: 22
  },
  tabButtons: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  tabButton: {
    paddingLeft: 5,
    paddingBottom: 7,
    paddingRight: 5,
    paddingTop: 5
  }
});

export default CourseDetailScreen;
