import React from "react";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

// importing the required routes component;
import Today from "../screens/myDay/Today";
import Assignments from "../screens/myDay/Assignments";
import CourseDetailScreen from "../components/stack/CourseDetailScreen";
import AssignmentDetailScreen from "../components/stack/AssignmentDetailScreen";
import Todos from "../screens/myDay/Todos";
import AddTodo from "../screens/todo/AddTodo";

const todayNavigator = createStackNavigator(
  {
    today: Today,
    courseDetailScreen: CourseDetailScreen,
    assignmentDetailScreen: AssignmentDetailScreen
  },
  {
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        return (
          <MaterialIcons
            name="today"
            size={23}
            color={focused ? tintColor : "black"}
          />
        );
      },
      tabBarColor: Colors.accent
    }
  }
);

const assignmentsNavigator = createStackNavigator(
  {
    todayAssignments: Assignments,
    assignmentDetailScreen: AssignmentDetailScreen
  },
  {
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        return (
          <MaterialIcons
            name="assignment"
            size={23}
            color={focused ? tintColor : "black"}
          />
        );
      },
      tabBarColor: Colors.primary
    }
  }
);

const todosNavigator = createStackNavigator(
  {
    Todos,
    AddTodo
  },
  {
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        return (
          <Octicons
            name="tasklist"
            size={23}
            color={focused ? tintColor : "black"}
          />
        );
      },
      tabBarColor: "#0f5947"
    }
  }
);

const routeConfig = {
  today: todayNavigator,
  todayAssignments: assignmentsNavigator,
  todayTodos: todosNavigator
};

const myDayNavigator = createMaterialBottomTabNavigator(routeConfig, {
  shifting: true,
  activeColor: "#f0edf6",
  inactiveColor: "#3e2465",
  barStyle: { backgroundColor: "#694fad" },
  navigationOptions: {
    drawerLabel: "My Day"
  }
});

export default myDayNavigator;
