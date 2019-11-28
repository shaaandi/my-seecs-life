import { createStackNavigator } from "react-navigation-stack";

import Calender from "../screens/calender/calender";
import CourseDetailScreen from "../components/stack/CourseDetailScreen";
import AssignmentDetailScreen from "../components/stack/AssignmentDetailScreen";

const routeConfig = {
  calender: Calender,
  courseDetailScreen: CourseDetailScreen,
  assignmentDetailScreen: AssignmentDetailScreen
};
const CalenderNavigator = createStackNavigator(routeConfig, {
  navigationOptions: {
    drawerLabel: "Calender"
  }
});

export default CalenderNavigator;
