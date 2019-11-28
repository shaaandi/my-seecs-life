import {
  FETCH_COURSES,
  FETCH_ASSIGNMENTS,
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  FETCH_TODOS,
  DELETE_C_TODOS
} from "../actions/courses";
import Course from "../../models/Course";
import Todo from "../../models/todo";
import Assignment from "../../models/Assignment";
import Colors from "../../constants/Colors";
const initialState = {
  courses: [],
  assignments: [],
  todos: []
};

import moment from "moment";

export default function(state = initialState, action) {
  let id, title, courseCode, dueDate, status;
  switch (action.type) {
    case FETCH_COURSES:
      return {
        ...state,
        courses: action.payload.courses.map(
          ({ courseCode, title, instructor, classTimmings }, index) =>
            new Course({
              courseCode,
              title,
              instructor,
              classTimmings,
              tint: Colors[index]
            })
        )
      };
    case FETCH_ASSIGNMENTS:
      return {
        ...state,
        assignments: action.payload.assignments.map(
          ({ id, title, courseCode, dueDate, dateGiven }) =>
            new Assignment({
              id,
              title,
              courseCode,
              dueDate,
              dateGiven
            })
        )
      };

    case FETCH_TODOS:
      return {
        ...state,
        todos: action.payload.todos.map(
          ({ id, title, courseCode, dueDate, status, createdAt }) =>
            new Todo({
              id,
              title,
              courseCode,
              dueDate,
              createdAt,
              status: status === 1 ? false : true
            })
        )
      };

    // todos cases;
    case ADD_TODO:
      // action payload should includes the todo data;
      title = action.payload.todo.title;
      courseCode = action.payload.todo.courseCode;
      dueDate = action.payload.todo.dueDate;
      id = action.payload.todo.id;
      createdAt = action.payload.todo.createdAt;
      status = false;
      todo = new Todo({ id, createdAt, title, courseCode, dueDate, status });

      // ADDING NEW CREATED TODO to the state;
      return {
        ...state,
        todos: [...state.todos, todo]
      };
    case DELETE_TODO:
      // action payload should inckude the id of the todo to be deleted;
      id = action.payload.id;
      let filteredArray = state.todos.filter(todo => todo.id !== id);
      // returning the filtered array ;
      return {
        ...state,
        todos: filteredArray
      };
      break;
    case DELETE_C_TODOS:
      // action.payload should include the type of todos needed to be deleted;
      let today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth();
      let date = today.getDate();
      let start = new Date(`${year}`, `${month}`, `${date}`, "00", "00", "00");
      let end = new Date(`${year}`, `${month}`, `${date}`, "23", "59", "59");
      let filteredArrayM;
      let type = action.payload.type;

      if (type === "TODAY") {
        filteredArrayM = state.todos.filter(todo => {
          if (!todo.status) return true;
          moment(todo.dueDate).isBetween(start, end) ? false : true;
        });
      } else if (type !== "") {
        filteredArrayM = state.todos.filter(todo => {
          if (!todo.status) return true;
          todo.courseCode === type ? false : true;
        });
      } else {
        filteredArrayM = state.todos.filter(todo => {
          if (!todo.status) return true;
          todo.courseCode === "" ? false : true;
        });
      }

      return {
        ...state,
        todos: filteredArrayM
      };
    case UPDATE_TODO:
      console.log(action.payload.todo);
      // action payload should inclued the id of the todo to be updated;
      id = action.payload.id;
      // payload should also include the data to be needed to be updated in data object;
      title = action.payload.todo.title;
      courseCode = action.payload.todo.courseCode;
      dueDate = action.payload.todo.dueDate;
      status = action.payload.todo.status;
      let updatedTodos = state.todos.map(todo => {
        if (todo.id === id) {
          // update the desired todos;
          return {
            id: id,
            title: title ? title : todo.title,
            courseCode: courseCode ? courseCode : todo.courseCode,
            dueDate: dueDate ? dueDate : todo.dueDate,
            status: status !== null ? status : todo.status
          };
        } else {
          return todo;
        }
      });
      // returning the updated Todos;
      return {
        ...state,
        todos: updatedTodos
      };
    default:
      return state;
  }
}
