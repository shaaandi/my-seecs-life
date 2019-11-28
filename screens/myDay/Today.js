import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableNativeFeedback
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";
let dayMapping = {
  1: "Mo",
  2: "Tu",
  3: "We",
  4: "Th",
  5: "Fr",
  6: "Sa",
  7: "Su"
};

function compare(a, b) {
  let aF = parseInt(a.time.from);
  let bF = parseInt(b.time.from);
  if (aF < bF) {
    return -1;
  }
  if (aF > bF) {
    return 1;
  }
  return 0;
}

const Today = props => {
  let { courses } = useSelector(({ root }) => root);
  let date = new Date();
  let n = date.getDay();
  let today = courses.map(({ classTimmings, title, courseCode, tint }) => {
    if (classTimmings[dayMapping[1]]) {
      // you have a class at this day; so now return the class timings with title;
      return {
        title,
        courseCode,
        time: classTimmings[dayMapping[1]],
        tint
      };
    }
  });
  // filtering and sorting the array;
  let myd = today.filter(val => val);
  let timmings = myd.sort(compare);
  const renderItem = ({ item, index }) => {
    let { title, time, courseCode, tint } = item;
    return (
      <TouchableNativeFeedback
        onPress={() =>
          props.navigation.navigate("courseDetailScreen", {
            id: courseCode,
            tint
          })
        }
      >
        <View style={{ borderLeftColor: tint, ...styles.listElem }}>
          <View>
            <Text style={styles.subTitle}>{title.slice(0, 35)}</Text>
          </View>
          <View>
            <Text style={styles.subTim}>
              {time.from} to {time.to}
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>{timmings.length} Class Today</Text>
      </View>
      <FlatList
        style={styles.list}
        data={timmings}
        renderItem={renderItem}
        keyExtractor={item => item.courseCode}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  heading: {
    padding: 10
  },
  headingText: {
    fontSize: 23
    // fontWeight: "bold"
  },
  list: {
    padding: 10
  },
  listElem: {
    padding: 5,
    borderLeftWidth: 5,
    // borderLeftColor: "#222",
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

Today.navigationOptions = props => {
  return {
    headerTitle: "My Day",
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

export default Today;
