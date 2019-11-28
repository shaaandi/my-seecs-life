import { createStackNavigator } from "react-navigation-stack";

// importing all screens;
import Today from "../screens/todo/lists/Today";
import Course from "../screens/todo/lists/Course";
import Tasks from "../screens/todo/lists/Tasks";
import TodoList from "../screens/todo/TodoList";
import AddTodo from "../screens/todo/AddTodo";

const routeConfig = {
  TodoList,
  Today: Today,
  Course: Course,
  Tasks: Tasks,
  AddTodo: AddTodo
};

export default createStackNavigator(routeConfig, {});
