export const FETCH_COURSES = "FETCH_COURSES";
export const FETCH_ASSIGNMENTS = "FETCH_ASSIGNMENTS";
export const FETCH_TODOS = "FETCH_TODOS";
// todos constants;
export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const DELETE_M_TODOS = "DELETE_M_TODOS";
export const DELETE_C_TODOS = "DELETE_C_TODOS";
// importing the db helpers;
import {
  fetchTodos,
  insertTodo,
  updateTodo as queryUpdateTodo,
  deleteCompletedTodos as queryDeleteCompleteTodos,
  fetchCourses as queryFetchCourses,
  insertCourses as queryInsertCourses,
  insertCourse as queryInsertCourse,
  insertAssignment as queryInsertAssignment,
  deleteAll as queryDeleteAll,
  fetchAssignments as queryFetchAssignments
} from "../../helpers/sqlite";

import data from "../../data/dummyData";

export const fetchCourses = () => async dispatch => {
  try {
    let { courses } = await data();
    // checking if the course exists , if  don't then just create new ;
    if (courses && courses.length > 1) {
      await queryDeleteAll("courses");
      let coursePromises = courses.map(async (course, index) => {
        return await queryInsertCourse(course);
      });

      Promise.all(coursePromises)
        .then(async () => {
          let newlyInsertCoursesWrapper = await queryFetchCourses();

          if (newlyInsertCoursesWrapper) {
            let newlyInsertCourses = newlyInsertCoursesWrapper.rows._array;
            await dispatch({
              type: FETCH_COURSES,
              payload: {
                courses: newlyInsertCourses
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      let dbCourses = await queryFetchCourses();
      await dispatch({
        type: FETCH_COURSES,
        payload: {
          courses: dbCourses.rows._array
        }
      });
    }
    return;
  } catch (err) {}
};

export const fetchAssignments = () => async dispatch => {
  try {
    let { assignments } = await data();
    // checking if the course exists , if  don't then just create new ;
    if (assignments && assignments.length > 1) {
      await queryDeleteAll("assignments");
      let assignmentPromises = assignments.map(async (assignment, index) => {
        return await queryInsertAssignment(assignment);
      });

      Promise.all(assignmentPromises)
        .then(async () => {
          let newlyInsertAssignmentsWrapper = await queryFetchAssignments();
          if (newlyInsertAssignmentsWrapper) {
            let newlyInsertAssignments =
              newlyInsertAssignmentsWrapper.rows._array;
            await dispatch({
              type: FETCH_ASSIGNMENTS,
              payload: {
                assignments: newlyInsertAssignments
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      let dbAssignments = await queryFetchAssignments();
      await dispatch({
        type: FETCH_ASSIGNMENTS,
        payload: {
          assignments: dbAssignments.rows._array
        }
      });
    }
    return;
  } catch (err) {}
};

export const addTodo = ({ todo }) => async dispatch => {
  try {
    let createdAt = new Date();
    let result = await insertTodo({ ...todo, createdAt });
    dispatch({
      type: ADD_TODO,
      payload: {
        todo: { ...todo, id: result.insertId, createdAt }
      }
    });
  } catch (err) {
    console.log("error occured", err);
  }
};

export const deleteTodo = ({ id }) => async dispatch => {
  dispatch({
    type: DELETE_TODO,
    payload: {
      id
    }
  });
};

export const deleteCompletedTodos = type => async dispatch => {
  try {
    let result = await queryDeleteCompleteTodos(type);
    dispatch({
      type: DELETE_C_TODOS,
      payload: {
        type
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateTodo = ({ id, data }) => async dispatch => {
  try {
    let response = await queryUpdateTodo(id, data);
    dispatch({
      type: UPDATE_TODO,
      payload: {
        id,
        todo: {
          ...data
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// fetching todos from the database;
export const setTodos = () => async dispatch => {
  // first fetching the data from db and then dispatching it to stores;
  let result = await fetchTodos();
  // the todos will be on the result.rows._array attribute;
  let todos = result.rows._array;
  dispatch({
    type: FETCH_TODOS,
    payload: {
      todos
    }
  });
};
