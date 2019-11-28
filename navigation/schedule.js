import { createStackNavigator } from "react-navigation-stack";
import CourseDetailSection from "../components/stack/CourseDetailScreen";
import AssignmentDetailSection from "../components/stack/AssignmentDetailScreen";

import Schedule from "../screens/schedule/Schedule";
const routeConfig = {
  schedule: Schedule,
  courseDetailScreen: CourseDetailSection,
  assignmentDetailScreen: AssignmentDetailSection
};
const ScheduleNavigator = createStackNavigator(routeConfig, {
  navigationOptions: {
    drawerLabel: "Schedule"
  }
});

export default ScheduleNavigator;
