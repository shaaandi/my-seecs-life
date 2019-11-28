import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableNativeFeedback
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector } from "react-redux";
import moment from "moment";

const isToday = someDate => {
  const today = new Date();
  console.log(today, someDate);
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

const Assignments = ({ navigation }) => {
  const { assignments, courses } = useSelector(state => state.root);
  // evaluating today assignments only;
  let todayAssignments = assignments.filter(assignment => {
    console.log(`${assignment.dueDate} : ${isToday(assignment.dueDate)}`);
    return isToday(assignment.dueDate);
  });

  const renderItem = ({
    item: { courseCode, dateGiven, dueDate, title, id },
    navigation
  }) => {
    let { tint } = courses.find(course => course.courseCode === courseCode);
    return (
      <TouchableNativeFeedback
        onPress={() => {
          navigation.navigate("assignmentDetailScreen", {
            id,
            tint
          });
        }}
      >
        <View style={styles.listElem}>
          <View>
            <Text style={styles.assignTitle}>{title}</Text>
          </View>
          <View style={styles.assignFooter}>
            <Text style={styles.assignCourseCode}>{courseCode}</Text>
            <Text style={styles.assignDateGiven}>
              Date Given : {moment(dateGiven).fromNow()}
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>
          {todayAssignments.length} due today.
        </Text>
      </View>
      <FlatList
        style={styles.list}
        data={todayAssignments}
        keyExtractor={item => item.id}
        renderItem={({ item }) => renderItem({ item, navigation })}
      />
    </ScrollView>
  );
};

Assignments.navigationOptions = props => {
  return {
    headerTitle: "Assignments",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="menu"
          iconName="ios-menu"
          color={"black"}
          onPress={() => props.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  heading: {
    padding: 10
  },
  headingText: {
    fontSize: 23
    // fontWeight: "bold"
  },
  list: {
    padding: 10
  },
  listElem: {
    padding: 5,
    borderLeftWidth: 5,
    borderLeftColor: "#222",
    // borderWidth: 1,
    margin: 4,
    elevation: 5,
    backgroundColor: "white"
  },
  assignTitle: {
    fontSize: 17
  },
  assignCourseCode: {
    color: "#97c4bb"
  },
  assignDateGiven: {
    color: "#97c4bb"
  },
  assignFooter: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default Assignments;
