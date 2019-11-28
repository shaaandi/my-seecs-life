import React from "react";
import { View, TextInput, StyleSheet, Text, Picker } from "react-native";

const CustomPicker = props => {
  const onInputChange = (inputIdentifier, value) => {
    let isValid = false;
    // validities check are performed here;
    if (value.trim().length > 0) {
      isValid = true;
    }
    // input specific validations
    switch (inputIdentifier) {
      case "imageUrl":
        // /\.(gif|jpg|jpeg|tiff|png)$/i
        isValid = /(https?:\/\/.*\.(?:png|jpg))/i.test(value) ? true : false;
    }
    props.dispatchToState(inputIdentifier, value, isValid);
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      {/* <TextInput
        style={{ ...styles.input, ...props.style }}
        onChangeText={text => onInputChange(props.inputIdentifier, text)}
        {...props}
      /> */}
      <Picker
        selectedValue={props.value}
        style={{ height: 50, width: "100%" }}
        onValueChange={(itemValue, itemIndex) =>
          onInputChange(props.inputIdentifier, itemValue)
        }
      >
        <Picker.Item enabled={false} label="Pick One" value="" />
        {props.courses.map(({ courseCode, tint, title }) => {
          return (
            <Picker.Item key={courseCode} label={title} value={courseCode} />
          );
        })}
      </Picker>
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
  }
});

export default CustomPicker;
