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
import FloatingButton from "../../components/UI/FloatingButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import moment from "moment";

const tint = "#0f5947";
// importing the redux functions;
import { updateTodo, deleteCompletedTodos } from "../../store/actions/courses";

const Todos = props => {
  const dispatch = useDispatch();
  const courses = useSelector(state => state.root.courses);
  const todos = useSelector(state =>
    state.root.todos.filter(todo => moment().isSame(todo.dueDate, "day"))
  );

  const renderItem = ({
    item: { title, courseCode, dueDate, status, createdAt, id }
  }) => {
    let course = courses.find(course => course.courseCode === courseCode);
    let tint = course ? course.tint : "gray";

    return (
      <TouchableNativeFeedback>
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
            <View style={styles.todoDetailWrapper}>
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
                    <Text
                      style={{
                        ...styles.todoDueDate,
                        color: status
                          ? new Date() > dueDate
                            ? "red"
                            : "gray"
                          : new Date() > dueDate
                          ? "red"
                          : "black"
                      }}
                    >
                      {moment(dueDate).format("h:mm a")}
                    </Text>
                  </View>
                </View>
              )}
              <View style={styles.todoDueDateWrapper}>
                <View style={styles.todoDueDateIconWrapper}>
                  <Ionicons
                    name={courseCode ? "ios-list" : "md-list-box"}
                    color={"gray"}
                    size={20}
                    title={"duedate"}
                  />
                </View>
                <View style={styles.todoDueDateTitle}>
                  <Text
                    style={{
                      ...styles.todoDueDate,
                      color: "gray"
                    }}
                  >
                    {courseCode ? courseCode : "Tasks"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  };

  //   finding the todos of this course and then showing them below;
  // for now take dummy data form above;

  return (
    <View style={{ backgroundColor: tint, ...styles.container }}>
      <View style={styles.heading}>
        <Text style={styles.headingTitle}>My Day</Text>
        <Text style={styles.headingDate}>
          {moment().format("dddd, Do MMMM")}
        </Text>
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
          dispatch(deleteCompletedTodos("TODAY"));
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

Todos.navigationOptions = props => {
  return {
    headerTitle: "Todos",
    headerStyle: {
      backgroundColor: "#0f5947"
    },
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
  headingDate: {
    fontWeight: "200",
    fontSize: 18,
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
  },
  todoDetailWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default Todos;
