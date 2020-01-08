import React from "react";
import { Platform, Dimensions } from "react-native";
import { createDrawerNavigator, createAppContainer } from "react-navigation";

import InputScreen from "../screens/DataInput/InputScreen";
import GraphScreen from "../screens/DataVisualization/GraphScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import MenuDrawer from "../components/MenuBar/MenuDrawer";

const WIDTH = Dimensions.get("window").width;

const DrawerConfig = {
  drawerWidth: WIDTH * 0.5,
  contentComponent: ({navigation}) => {
    return (<MenuDrawer navigation={navigation}/>);
  }
};
const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    UserInput: {
      screen: InputScreen
    },
    DataVisual: {
      screen: GraphScreen
    }
  },
  DrawerConfig
);

export default createAppContainer(DrawerNavigator);
