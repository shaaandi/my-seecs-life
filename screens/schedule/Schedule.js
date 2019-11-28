import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  TouchableNativeFeedback
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector } from "react-redux";

const dayName = {
  Mo: "Monday",
  Tu: "Tuesday",
  We: "Wednesday",
  Th: "Thrusday",
  Fr: "Friday",
  Sa: "Saturday",
  Su: "Sunday"
};

const Schedule = props => {
  const { courses } = useSelector(({ root }) => root);
  const renderItem = ({ item: { classTimmings, title, courseCode, tint } }) => {
    let days = Object.keys(classTimmings);
    return (
      <TouchableNativeFeedback
        onPress={() =>
          props.navigation.navigate("courseDetailScreen", {
            id: courseCode,
            tint: tint
          })
        }
      >
        <View style={styles.listElem}>
          <View>
            <Text style={styles.subTitle}>{title}</Text>
          </View>
          {days.map(day => {
            return (
              <View key={day}>
                <Text style={styles.subTim}>
                  {classTimmings[day].from} - {classTimmings[day].to}{" "}
                  {dayName[day]}
                </Text>
              </View>
            );
          })}
        </View>
      </TouchableNativeFeedback>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={courses}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1
  },
  heading: {
    padding: 10
  },
  headingText: {
    fontSize: 23
    // fontWeight: "bold"
  },
  list: {
    padding: 1
  },
  listElem: {
    padding: 5,
    borderLeftWidth: 5,
    borderLeftColor: "#222",
    // borderWidth: 1,
    margin: 4,
    elevation: 5,
    backgroundColor: "white"
  },
  subTitle: {
    fontSize: 18
  },
  subTim: {
    color: "#97c4bb"
  }
});

Schedule.navigationOptions = props => {
  return {
    headerTitle: "Schedule",
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

export default Schedule;
