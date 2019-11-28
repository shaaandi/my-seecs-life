import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons, EvilIcons } from "@expo/vector-icons";
import moment from "moment";

const numToDay = {
  0: "Mo",
  1: "Tu",
  2: "We",
  3: "Th",
  4: "Fr",
  5: "Sa",
  6: "Su"
};

const AssignmentDetailScreen = props => {
  const id = props.navigation.getParam("id");
  const tint = props.navigation.getParam("tint");
  const assignment = useSelector(state =>
    state.root.assignments.find(assignment => assignment.id === id)
  );
  let { courseCode, title, dateGiven, dueDate } = assignment;
  const course = useSelector(state =>
    state.root.courses.find(course => course.courseCode === courseCode)
  );
  let { classTimmings, title: courseTitle } = course;
  let day = dueDate.getDay() - 1;
  console.log(day);

  let upComming = classTimmings[numToDay[day]] && {
    day: numToDay[day],
    ...classTimmings[numToDay[day]]
  };

  let completionTimeString =
    moment(dueDate).diff(new Date(), "days") > 0
      ? `${moment(dueDate).diff(new Date(), "days")} days to complete.`
      : moment(dueDate).diff(new Date(), "hours") > 0
      ? `${moment(dueDate).diff(new Date(), "hours")} hours to complete.`
      : moment(dueDate).diff(new Date(), "minutes") > 0
      ? `${moment(dueDate).diff(new Date(), "minutes")} minutes to complete.`
      : `Assignment Overdue`;

  return (
    <View>
      <View style={{ backgroundColor: tint, ...styles.heading }}>
        <Text style={styles.headingAT}>Assignment : {title}</Text>
        <Text style={styles.headingCT}>Course : {courseTitle}</Text>
      </View>
      <View style={styles.date}>
        <View style={styles.dueDate}>
          <View style={styles.dateIconWrapper}>
            <MaterialCommunityIcons
              name="calendar-clock"
              size={32}
              color="black"
            />
          </View>
          <View style={styles.dateWrapper}>
            <Text style={styles.dateTo}>
              Due{" "}
              {moment(dueDate).calendar(null, {
                sameDay: "[Today]",
                nextDay: "[Tomorrow]",
                nextWeek: "dddd",
                lastDay: "[Yesterday]",
                lastWeek: "[Last] dddd",
                sameElse: "DD/MM/YYYY"
              })}
            </Text>
            <Text style={styles.dateCount}>{completionTimeString}</Text>
          </View>
        </View>
        <View style={styles.dueDate}>
          <View style={styles.dateIconWrapper}>
            <MaterialCommunityIcons
              name="calendar-import"
              size={32}
              color="black"
            />
          </View>
          <View style={styles.dateWrapper}>
            <Text style={styles.dateTo}>Assigned 4 days ago</Text>
          </View>
        </View>
      </View>
      <View style={styles.details}>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "wheat" }}>
            Due for Class
          </Text>
        </View>
        {upComming ? (
          <View style={styles.detail}>
            <View style={styles.detailIcon}>
              <EvilIcons name="calendar" size={35} color="black" />
            </View>
            <View style={styles.detailTextWrapper}>
              <Text style={styles.detailText}>
                {upComming.day} : {upComming.from}-{upComming.to}
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <Text>No class on due date</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    paddingHorizontal: 10,
    paddingTop: 30,
    paddingBottom: 10
  },
  headingAT: {
    fontSize: 23,
    padding: 5
  },
  headingCT: {
    fontSize: 18,
    padding: 5
  },
  dueDate: {
    flexDirection: "row",
    width: "100%",
    padding: 10
  },
  dateIconWrapper: {
    flexBasis: "15%"
  },
  dateWrapper: {
    flexBasis: "85%"
  },
  dateCount: {
    fontSize: 18
  },
  date: {
    borderBottomColor: "gray",
    borderBottomWidth: 1
  },
  detail: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    padding: 10
  },
  detailIcon: {
    flexBasis: "12%"
  },
  detailTextWrapper: {
    flexBasis: "88%"
  },
  detailText: {
    fontSize: 18
  },
  details: {
    borderBottomWidth: 1,
    borderBottomColor: "gray"
  }
});

AssignmentDetailScreen.navigationOptions = props => {
  let tint = props.navigation.getParam("tint");
  return {
    headerStyle: {
      backgroundColor: tint
    }
  };
};

export default AssignmentDetailScreen;
