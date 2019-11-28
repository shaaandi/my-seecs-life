import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";

import myDayNavigator from "./myDay";
import calenderNavigator from "./calender";
import assignmentsScreen from "./assignments";
import scheduleNavigator from "./schedule";
import todoNavigator from "./todo";
import Colors from "../constants/Colors";

const rootNavigator = {
  myDay: myDayNavigator,
  calender: calenderNavigator,
  assignments: assignmentsScreen,
  schedule: scheduleNavigator,
  todos: todoNavigator
};

const drawer = createDrawerNavigator(rootNavigator, {
  contentOptions: {
    activeTintColor: Colors.accent
  }
});

export default createAppContainer(drawer);
