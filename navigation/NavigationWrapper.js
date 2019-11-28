import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { useDispatch } from "react-redux";
import {
  fetchCourses,
  fetchAssignments,
  setTodos
} from "../store/actions/courses";
import RootNavigator from "./index";
import Colors from "../constants/Colors";

const NavigationWrapper = props => {
  let [loading, setLoding] = useState(true);
  let dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchCourses());
      await dispatch(fetchAssignments());
      await dispatch(setTodos());
      setLoding(false);
      return;
    };
    loadData();
  }, [dispatch]);

  return loading ? (
    <View>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  ) : (
    <RootNavigator />
  );
};

export default NavigationWrapper;
