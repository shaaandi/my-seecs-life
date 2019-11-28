import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const dayName = {
  Mo: "Monday",
  Tu: "Tuesday",
  We: "Wednesday",
  Th: "Thrusday",
  Fr: "Friday",
  Sa: "Saturday",
  Su: "Sunday"
};

const Schedule = props => {
  let id = props.id;
  let course = useSelector(state =>
    state.root.courses.find(course => course.courseCode === id)
  );
  let { classTimmings, tint } = course;
  let days = Object.keys(classTimmings);
  return (
    <View>
      {days.map(day => {
        return (
          <View style={styles.schedule} key={day}>
            <Text style={{ color: tint, ...styles.subTim }}>
              {classTimmings[day].from} - {classTimmings[day].to} {dayName[day]}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  subTim: {
    fontSize: 21
  },
  schedule: {
    padding: 5
  }
});

export default Schedule;
