import React from "react";
import {
  View,
  StyleSheet,
  Text,
  DatePickerAndroid,
  TimePickerAndroid,
  TouchableNativeFeedback
} from "react-native";

import moment, { min } from "moment";

import { EvilIcons } from "@expo/vector-icons";

const CustomDateButton = props => {
  let { value, onPress, onReset } = props;
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonIconWrapper}>
          <EvilIcons name="calendar" size={25} color="green" />
        </View>
        <View style={styles.buttonTextWrapper}>
          <Text>
            {value ? moment(value).format("ddd, hA") : "Set due date"}
          </Text>
        </View>
        {value && (
          <TouchableNativeFeedback onPress={onReset}>
            <View style={styles.buttonResetWrapper}>
              <EvilIcons name="close-o" size={20} color={"gray"} />
            </View>
          </TouchableNativeFeedback>
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

const DatePicker = props => {
  let { value } = props;
  console.log(value);
  const onInputChange = (inputIdentifier, value) => {
    props.dispatchToState(inputIdentifier, value, true);
  };

  const openDatePicker = async type => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date()
      });

      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        try {
          const { action, hour, minute } = await TimePickerAndroid.open({
            hour: 14,
            minute: 0,
            is24Hour: false // Will display '2 PM'
          });
          if (action !== TimePickerAndroid.dismissedAction) {
            // Selected hour (0-23), minute (0-59)
            onInputChange("dueDate", new Date(year, month, day, hour, minute));
          }
        } catch ({ code, message }) {
          console.warn("Cannot open time picker", message);
        }
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <CustomDateButton
        value={value}
        onPress={() => openDatePicker("andriod")}
        onReset={() => onInputChange("dueDate", null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%"
  },
  label: {
    // fontFamily: "open-sans-bold",
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  buttonWrapper: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    backgroundColor: "whitesmoke",
    borderRadius: 5,
    width: 150
  },
  buttonIconWrapper: {
    padding: 5
  },
  buttonResetWrapper: {
    padding: 5
  },
  buttonTextWrapper: {
    padding: 5
  }
});

export default DatePicker;
