import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import { View, Text, Icon } from "native-base";
import NavImage from "../../assets/image/navImage.jpg";

export default class MenuDrawer extends Component {
  navLink(nav, text, icon) {
    return (
      <TouchableOpacity style={styles.link} onPress={() => this.props.navigation.navigate(nav)}>
        <View style={{flexDirection: "row"}}>
          <Icon name={icon} style={{ color: "#1155cc" }} />
          <View style={{ marginTop: 5, marginLeft: 5 }}>
            <Text style={{ color: "#1155cc" }}>{text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topLinks}>
          <View style={styles.profile}>
            <View style={styles.imgView}>
              <Image source={NavImage} style={styles.image} />
            </View>
          </View>
        </View>
        <View style={styles.bottomLinks}>
          {this.navLink("Home", "Home", "ios-home")}
          {this.navLink("UserInput", "User Input", "ios-person")}
          {this.navLink("DataVisual", "Data Visual", "ios-image")}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey"
  },
  profile: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#777"
  },
  imgView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  image: {
    width: "100%",
    height: "100%",
  },
  topLinks: {
    height: 160,
    backgroundColor: "black"
  },
  bottomLinks: {
    flex: 1,
  },
  link: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 5,
    padding: 5,
    paddingLeft: 15,
    textAlign: "left",
    borderBottomColor: "black",
    borderBottomWidth: 1
  }
});
