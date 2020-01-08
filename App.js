import React from "react";
import { View } from "native-base";

import DrawerNavigator from "./src/navigation/DrawerNavigation";

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <DrawerNavigator />
      </View>
    );
  }
}
