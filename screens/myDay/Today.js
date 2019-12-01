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
import moment from 'moment';
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
    if (classTimmings[dayMapping[n]]) {
      // you have a class at this day; so now return the class timings with title;
      return {
        title,
        courseCode,
        time: classTimmings[dayMapping[n]],
        tint
      };
    }
  });
  // filtering and sorting the array;
  let myd = today.filter(val => val);
  let timmings = myd.sort(compare);
  const renderItem = ({ item, index }) => {
    let { title, time, courseCode, tint } = item;
    let from = new Date();
    let to = new Date();
    from.setHours(time.from.slice(0,2));
    from.setMinutes(time.from.slice(2,4))
    to.setHours(time.to.slice(0,2));
    to.setMinutes(time.to.slice(2,4))
    borderLeftTint = moment(from).isAfter(new Date()) ? tint : `${tint}6b`;
    backgroundTint = moment(from).isAfter(new Date()) ? 'white' : 'whitesmoke';
    return (
      <TouchableNativeFeedback
        onPress={() =>
          props.navigation.navigate("courseDetailScreen", {
            id: courseCode,
            tint
          })
        }
      >
        <View style={{ borderLeftColor: borderLeftTint, ...styles.listElem , backgroundColor : backgroundTint }}>
          <View>
            <Text style={styles.subTitle}>{title.slice(0, 35)}</Text>
          </View>
          <View>
            <Text style={styles.subTim}>
              {moment(from).format("h:mm a")} to {moment(to).format("h:mm a")}
            </Text>
          </View>
          {/* if the from is not after but to is after than show the bar */}
          <View style={styles.toolTipWrapper}>
            <View style={styles.toolTipWrapper}>

            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>
  {timmings.length}{(timmings.length > 1  ?  ` Classes Today`: ` Class Today` )}
          </Text>
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
    paddingVertical : 10,
    paddingHorizontal : 0
  },
  heading: {
    padding: 10
  },
  headingText: {
    fontSize: 23
    // fontWeight: "bold"
  },
  list: {
    paddingVertical : 10,
    paddingHorizontal : 0 
  },
  listElem: {
    padding : 5,
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
