import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

const Input = props => {
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
      <TextInput
        style={{ ...styles.input, ...props.style }}
        onChangeText={text => onInputChange(props.inputIdentifier, text)}
        {...props}
      />
      <Text style={styles.inputError}>
        {props.showValidation
          ? props.isValid
            ? ""
            : `InValid ${props.inputIdentifier}`
          : ""}
      </Text>
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

export default Input;
