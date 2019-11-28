import { createStackNavigator } from "react-navigation-stack";

import Assignments from "../screens/assignments/Assignments";
import AssignmentDetailScreen from "../components/stack/AssignmentDetailScreen";
const routeConfig = {
  assignments: Assignments,
  assignmentDetailScreen: AssignmentDetailScreen
};
const AssignmentsNavigator = createStackNavigator(routeConfig, {
  navigationOptions: {
    drawerLabel: "Assignments"
  }
});

export default AssignmentsNavigator;
