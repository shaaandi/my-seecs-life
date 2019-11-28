import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NavigationWrapper from "./navigation/NavigationWrapper";

import { Provider } from "react-redux";
import store from "./store/index";

// importing the db init function to initialize the db;
import { init, db } from "./helpers/sqlite";

// let result = fetchCourses();

init()
  .then(() => {
    console.log("Initialized Database");
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM courses",
        [],
        (_, result) => {
          console.log(result, "Courses currently in the SQLite");
        },
        (_, err) => {
          console.log(err);
        }
      );
    });
  })
  .catch(err => {
    console.log("Initialization of Database failed : error Occured");
    console.log(err);
  });

export default function App() {
  return (
    <Provider store={store}>
      <NavigationWrapper />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
