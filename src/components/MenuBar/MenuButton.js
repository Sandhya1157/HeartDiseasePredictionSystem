import React, { Component } from "react";
import { Icon, Button } from "native-base";

export class MenuButton extends Component {
  render() {
    return (
      <Button transparent onPress={() => this.props.navigation.toggleDrawer() }>
        <Icon name="md-menu" style={{ color: "white" }} />
      </Button>
    );
  }
}
