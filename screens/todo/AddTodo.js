import React, { useEffect, useCallback, useReducer, useState } from "react";
import { View, ScrollView, StyleSheet, Platform, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

// importing the redux actions;
import { addTodo } from "../../store/actions/courses";

// temp ************
// ********************

import HeaderButton from "../../components/UI/HeaderButton";
import Input from "../../components/UI/Input";
import Picker from "../../components/UI/Picker";
import CustomDateTimePicker from "../../components/UI/DateTimePicker";
// ReducerConstants
const INPUT_CHANGE = "INPUT_CHANGE";

function reducer(state, action) {
  switch (action.type) {
    case INPUT_CHANGE:
      let { inputIdentifier, value, isValid } = action.payload;
      const updatedInputs = {
        ...state.inputs,
        [inputIdentifier]: value
      };
      const updatedValidities = {
        ...state.validities,
        [inputIdentifier]: isValid
      };
      let isFormValid = true;
      //   checking all the validities of the inputs again;

      for (const key in updatedValidities) {
        isFormValid = isFormValid && updatedValidities[key];
      }
      return {
        validities: updatedValidities,
        inputs: updatedInputs,
        isFormValid
      };
    default:
      return state;
  }
}

const AddTodo = props => {
  const { courses } = useSelector(state => state.root);
  const [onFocus, setOnFocus] = useState("");
  const [showValidity, setShowValidity] = useState([]);
  const dispatch = useDispatch();
  let [state, formDispatch] = useReducer(reducer, {
    inputs: {
      title: "",
      courseCode: "",
      dueDate: null
    },
    validities: {
      title: false,
      courseCode: true,
      dueDate: true
    },
    isFormValid: false
  });

  let { title, courseCode, dueDate } = state.inputs;
  let {
    title: isTitleValid,
    courseCode: isCourseCodeValid,
    dueDate: isDueDateValid
  } = state.validities;

  const onInputChange = (inputIdentifier, value, isValid) => {
    formDispatch({
      type: INPUT_CHANGE,
      payload: {
        value,
        inputIdentifier,
        isValid
      }
    });
  };

  const submitHandler = useCallback(async () => {
    if (!state.isFormValid) {
      Alert.alert("Wrong Input!", "Please Check the errors in the form", [
        {
          text: "Okay"
        }
      ]);
      return;
    }
    try {
      let { title, courseCode, dueDate } = state.inputs;
      await dispatch(
        addTodo({
          todo: {
            title,
            courseCode,
            dueDate
          }
        })
      );
      props.navigation.goBack();
    } catch (err) {
      Alert.alert("Wrong Input!", err, [
        {
          text: "Okay",
          onPress: () => {
            props.navigation.goBack();
          }
        }
      ]);
      // handling the error
    }
  }, [dispatch, state]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          value={title}
          label={"Title"}
          dispatchToState={onInputChange}
          onBlur={() => setOnFocus("")}
          onFocus={() => {
            setShowValidity(arr => [...arr, "title"]);
            setOnFocus("title");
          }}
          showValidation={
            onFocus === "title" ? false : showValidity.includes("title")
          }
          inputIdentifier={"title"}
          isValid={isTitleValid}
        />
        <Picker
          value={courseCode}
          courses={courses}
          label={"Course Code"}
          dispatchToState={onInputChange}
          onBlur={() => setOnFocus("")}
          onFocus={() => {
            setShowValidity(arr => [...arr, "courseCode"]);
            setOnFocus("courseCode");
          }}
          inputIdentifier={"courseCode"}
          showValidation={
            onFocus === "courseCode"
              ? false
              : showValidity.includes("courseCode")
          }
          isValid={isCourseCodeValid}
        />
        <CustomDateTimePicker
          value={dueDate}
          label={"Due Date"}
          dispatchToState={onInputChange}
          onBlur={() => setOnFocus("")}
          onFocus={() => {
            setShowValidity(arr => [...arr, "dueDate"]);
            setOnFocus("dueDate");
          }}
          inputIdentifier={"dueDate"}
          showValidation={
            onFocus === "dueDate" ? false : showValidity.includes("dueDate")
          }
          isValid={isDueDateValid}
        />
      </View>
    </ScrollView>
  );
};

AddTodo.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: "Add Todo",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  }
});

export default AddTodo;
