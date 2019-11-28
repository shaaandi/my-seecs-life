import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableNativeFeedback
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons, FontAwesome, EvilIcons } from "@expo/vector-icons";
import FloatingButton from "../../../components/UI/FloatingButton";
import moment from "moment";
import {
  updateTodo,
  deleteCompletedTodos
} from "../../../store/actions/courses";

// ios-checkmark-circle-outline;
// circle-thin;

const Course = props => {
  let dispatch = useDispatch();
  let courseCode = props.navigation.getParam("courseCode");
  let course = useSelector(state =>
    state.root.courses.find(course => course.courseCode === courseCode)
  );
  let { title, instructor, classTimmings, tint } = course;
  let todos = useSelector(state =>
    state.root.todos.filter(todo => todo.courseCode === courseCode)
  );

  const renderItem = ({
    item: { title, courseCode, dueDate, status, createdAt, id }
  }) => {
    return (
      <View style={styles.todoWrapper}>
        <View style={styles.todoIconWrapper}>
          {status ? (
            <TouchableNativeFeedback
              onPress={() => {
                dispatch(
                  updateTodo({
                    id,
                    data: {
                      status: !status
                    }
                  })
                );
              }}
            >
              <Ionicons
                name="ios-checkmark-circle-outline"
                color={tint}
                size={25}
                title={"true"}
              />
            </TouchableNativeFeedback>
          ) : (
            <TouchableNativeFeedback
              onPress={() => {
                dispatch(
                  updateTodo({
                    id,
                    data: {
                      status: !status
                    }
                  })
                );
              }}
            >
              <FontAwesome
                name="circle-thin"
                color={"gray"}
                size={25}
                title={"false"}
              />
            </TouchableNativeFeedback>
          )}
        </View>
        <View style={styles.todoTitleWrapper}>
          <View>
            {status ? (
              <Text
                style={{
                  textDecorationLine: "line-through",
                  color: "gray",
                  ...styles.todoTitle
                }}
              >
                {title}
              </Text>
            ) : (
              <Text
                style={{
                  ...styles.todoTitle,
                  color: "black"
                }}
              >
                {title}
              </Text>
            )}
          </View>
          {dueDate && (
            <View style={styles.todoDueDateWrapper}>
              <View style={styles.todoDueDateIconWrapper}>
                <EvilIcons
                  name="calendar"
                  color={new Date() > dueDate ? "red" : "gray"}
                  size={20}
                  title={"duedate"}
                />
              </View>
              <View style={styles.todoDueDateTitle}>
                {status ? (
                  <Text
                    style={{
                      ...styles.todoDueDate,
                      color: new Date() > dueDate ? "red" : "gray"
                    }}
                  >
                    {moment(dueDate).format("dddd, MMMM Do, h:mm a")}
                  </Text>
                ) : (
                  <Text
                    style={{
                      ...styles.todoDueDate,
                      color: new Date() > dueDate ? "red" : "black"
                    }}
                  >
                    {moment(dueDate).format("dddd, MMMM Do, h:mm a")}
                  </Text>
                )}
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  //   finding the todos of this course and then showing them below;
  // for now take dummy data form above;

  return (
    <View style={{ backgroundColor: tint, ...styles.container }}>
      <View style={styles.heading}>
        <Text style={styles.headingTitle}>{title}</Text>
      </View>
      <ScrollView>
        <FlatList
          data={todos}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          style={styles.todos}
        />
      </ScrollView>
      <FloatingButton
        onPress={() => {
          props.navigation.navigate("AddTodo", {});
        }}
        iconName={"ios-add"}
        iconTitle={"addTodo"}
        iconColor={"white"}
        right={0}
        bottom={0}
      />
      <FloatingButton
        onPress={() => {
          dispatch(deleteCompletedTodos(courseCode));
        }}
        iconName={"ios-trash"}
        iconTitle={"deleteCompleted"}
        iconColor={"black"}
        left={0}
        bottom={0}
      />
    </View>
  );
};

Course.navigationOptions = props => {
  let tint = props.navigation.getParam("tint");
  return {
    headerStyle: {
      backgroundColor: tint
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  heading: {
    padding: 8
  },
  headingTitle: {
    fontWeight: "200",
    fontSize: 25,
    color: "white"
  },
  todos: {
    padding: 5
  },
  todoWrapper: {
    padding: 7,
    marginVertical: 2,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10
  },
  todoIconWrapper: {
    padding: 3,
    flexBasis: "10%"
  },
  todoTitleWrapper: {
    flexBasis: "90%",
    padding: 3
  },
  todoTitle: {
    fontSize: 19
  },
  todoDueDateWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 1
  },
  todoDueDate: {
    fontSize: 16
  },
  todoDueDateTitle: {
    paddingHorizontal: 2
  },
  todoDueDateIconWrapper: {
    paddingHorizontal: 2
  }
});

export default Course;
