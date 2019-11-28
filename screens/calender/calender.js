import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import WeekView from "react-native-week-view";
import { useSelector } from "react-redux";
import moment from "moment";

const getWeekDates = date => {
  let today = date ? moment(date) : moment();
  console.log(today);
  let todayN = today.day();
  console.log(todayN);
  // changing todayN in accordance with Mo-Su
  todayN = evalMap[todayN];
  console.log(todayN);
  let obj = [0, 1, 2, 3, 4, 5, 6];
  let dates = {};

  obj.forEach(num => {
    let temp;
    let mod = todayN - num;
    if (mod > 0) {
      temp = moment(today).subtract(Math.abs(mod), "days");
      dates[num] = temp;
    } else if (mod < 0) {
      temp = moment(today).add(Math.abs(mod), "days");
      dates[num] = temp;
    } else if (mod === 0) {
      dates[num] = today;
    }
  });
  return dates;
};
const evalMap = {
  0: 6,
  1: 0,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5
};

const dayMapping = {
  Mo: 0,
  Tu: 1,
  We: 2,
  Th: 3,
  Fr: 4,
  Sa: 5,
  Su: 6
};

const getEvents = (date, courses) => {
  let weekDayMaps = getWeekDates(date);
  let events = [];
  courses.forEach(({ courseCode, classTimmings, title, tint }) => {
    for (key in classTimmings) {
      let { to, from } = classTimmings[key];
      let start = weekDayMaps[dayMapping[key]];
      // console.log(start);
      // console.log(start.year(), start.month(), start.date());
      start = new Date(
        start.year(),
        start.month(),
        start.date(),
        from.slice(0, 2),
        from.slice(2, 4)
      );
      let end = weekDayMaps[dayMapping[key]];
      end = new Date(
        end.year(),
        end.month(),
        end.date(),
        to.slice(0, 2),
        to.slice(2, 4)
      );
      console.log(tint);
      color = new Date() > start ? `${tint}57` : tint;
      events.push({
        id: `${courseCode}-${key}`,
        description: title,
        startDate: start,
        endDate: end,
        color
      });
    }
  });

  return events;
};

const Calender = props => {
  const { courses } = useSelector(state => state.root);
  const [date, setDate] = useState(moment());
  // const [events, setEvents] = useState(getEvents(date, courses));
  return (
    <View style={{ flex: 1 }}>
      <WeekView
        style={{ flex: 1 }}
        events={getEvents(date, courses)}
        numberOfDays={7}
        selectedDate={new Date(date)}
        dateHeaderFormat={"MMMD"}
        locale="en"
        headerStyle={styles.headerStyle}
        onEventPress={({ id, color }) => {
          let arr = id.split("-");
          let courseCode = arr[0];
          let tint = color;
          props.navigation.navigate("courseDetailScreen", {
            id: courseCode,
            tint
          });
        }}
        onSwipeNext={date => {
          setDate(date);
        }}
        onSwipePrev={date => {
          setDate(date);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#4286f4"
  }
});

Calender.navigationOptions = props => {
  return {
    headerTitle: "Calender",
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

export default Calender;
