import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  TouchableNativeFeedback
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector } from "react-redux";
import moment from "moment";

const isToday = someDate => {
  const today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

const isTomorrow = someDate => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    someDate.getDate() == tomorrow.getDate() &&
    someDate.getMonth() == tomorrow.getMonth() &&
    someDate.getFullYear() == tomorrow.getFullYear()
  );
};

const isInThisWeek = someDate => {
  const today = new Date();
  const start = new Date(today);
  const end = new Date(today);
  start.setDate(start.getDate() + 2);
  end.setDate(end.getDate() + (6 - today.getDay()));
  return moment(someDate).isBetween(start, end);
};

const isInNextWeek = someDate => {
  const today = new Date();
  const start = new Date(today);
  const end = new Date(today);
  start.setDate(start.getDate() + (7 - today.getDay()));
  end.setDate(start.getDate() + 6);
  return moment(someDate).isBetween(start, end);
};

const Assignments = props => {
  const { assignments, courses } = useSelector(({ root }) => root);

  let todayAssignments = assignments.filter(assignment => {
    console.log(`${assignment.dueDate} : ${isToday(assignment.dueDate)}`);
    return isToday(assignment.dueDate);
  });

  let tomorrowAssignments = assignments.filter(assignment => {
    console.log(`${assignment.dueDate} : ${isTomorrow(assignment.dueDate)}`);
    return isTomorrow(assignment.dueDate);
  });

  let weekAssignments = assignments.filter(assignment => {
    console.log(`${assignment.dueDate} : ${isInThisWeek(assignment.dueDate)}`);
    return isInThisWeek(assignment.dueDate);
  });

  let nextWeekAssignments = assignments.filter(assignment => {
    console.log(`${assignment.dueDate} : ${isInNextWeek(assignment.dueDate)}`);
    return isInNextWeek(assignment.dueDate);
  });

  const renderItem = ({
    item: { courseCode, dateGiven, dueDate, title, id }
  }) => {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          // gettting courseCode tint color;
          let { tint } = courses.find(
            course => course.courseCode === courseCode
          );
          props.navigation.navigate("assignmentDetailScreen", {
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
    <ScrollView>
      {todayAssignments.length > 0 && (
        <View>
          <View style={styles.sublistHeading}>
            <Text style={styles.sublistHeadingText}>Due Today</Text>
          </View>
          <FlatList
            data={todayAssignments}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </View>
      )}
      {tomorrowAssignments.length > 0 && (
        <View>
          <View style={styles.sublistHeading}>
            <Text style={styles.sublistHeadingText}>Due Tomorrow</Text>
          </View>
          <FlatList
            data={tomorrowAssignments}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </View>
      )}
      {weekAssignments.length > 0 && (
        <View>
          <View style={styles.sublistHeading}>
            <Text style={styles.sublistHeadingText}>Due This Week</Text>
          </View>
          <FlatList
            data={weekAssignments}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </View>
      )}
      {nextWeekAssignments.length > 0 && (
        <View>
          <View style={styles.sublistHeading}>
            <Text style={styles.sublistHeadingText}>Due Next Week</Text>
          </View>
          <FlatList
            data={nextWeekAssignments}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </View>
      )}
    </ScrollView>
  );
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
  },
  sublistHeading: {
    padding: 5
  },
  sublistHeadingText: {
    fontSize: 19
  }
});

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

export default Assignments;
