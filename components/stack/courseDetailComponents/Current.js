import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableNativeFeedback
} from "react-native";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  EvilIcons,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons";

const dayMapping = {
  Mo: 0,
  Tu: 1,
  We: 2,
  Th: 3,
  Fr: 4,
  Sa: 5,
  Su: 6
};

const renderAssignment = ({
  item: { courseCode, dateGiven, dueDate, title, id },
  navigation,
  tint
}) => {
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
          <Text style={styles.assignCourseCode}>
            Due Date : {moment(dueDate).format("dddd, MMMM Do YYYY")}
          </Text>
          <Text style={styles.assignDateGiven}>
            Date Given : {moment(dateGiven).fromNow()}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};
const Current = ({ id, navigation }) => {
  const course = useSelector(state =>
    state.root.courses.find(course => course.courseCode === id)
  );

  // evaluating the assignments;
  const assignments = useSelector(state =>
    state.root.assignments.filter(assignment => assignment.courseCode === id)
  );
  let { instructor, classTimmings, tint } = course;
  // evaluating the upcoming class time and day;
  upComming = null;
  currentSmallest = Infinity;
  let today = new Date();
  let todayWeight = today.getDay();
  for (time in classTimmings) {
    let classDayWeight = dayMapping[time];
    // checking if the class weight is less than today weight then, adding 7 to it;
    if (todayWeight - classDayWeight > 0) classDayWeight + 7;
    let dif = Math.abs(todayWeight - classDayWeight);
    if (dif >= 0) {
      if (dif < currentSmallest) {
        currentSmallest = dif;
        upComming = {
          day: time,
          ...classTimmings[time]
        };
      }
    } else {
      let modDif = 7 + dif;
      if (modDif < currentSmallest) {
        currentSmallest = modDif;
        upComming = {
          day: time,
          ...classTimmings[time]
        };
      }
    }
  }

  return (
    <View style={styles.sectionWrapper}>
      <View style={styles.details}>
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
        <View style={styles.detail}>
          <View style={styles.detailIcon}>
            <MaterialCommunityIcons name="teach" size={35} color="black" />
          </View>
          <View style={styles.detailTextWrapper}>
            <Text style={styles.detailText}>{instructor}</Text>
          </View>
        </View>
        <View style={styles.detail}>
          <View style={styles.detailIcon}>
            <MaterialIcons name="room" size={35} color="black" />
          </View>
          <View style={styles.detailTextWrapper}>
            <Text style={styles.detailText}>Class Room 5 at SEECS</Text>
          </View>
        </View>
      </View>
      <View style={styles.assignments}>
        <View style={styles.assignmentsHeading}>
          <Text style={styles.assignmentsHeadingText}>
            Assignments due this course.
          </Text>
        </View>
        <View>
          <FlatList
            style={styles.list}
            data={assignments}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
              renderAssignment({ navigation, item, tint })
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detail: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    padding: 5
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
  sectionWrapper: {
    padding: 5
  },
  details: {
    borderBottomWidth: 1,
    borderBottomColor: "gray"
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
    // flexDirection: "row",
    // justifyContent: "space-between"
  },
  sublistHeading: {
    padding: 5
  },
  sublistHeadingText: {
    fontSize: 19
  },
  assignmentsHeading: {
    paddingVertical: 5
  },
  assignmentsHeadingText: {
    fontSize: 19
  }
});

export default Current;
