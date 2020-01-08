import React from "react";
import { Text } from "native-base";

export default class ErrorText extends React.Component {
  render() {
    if (!this.props.hidden) {
      return <Text />;
    } else {
      return <Text style={{margin: 5, color: "#aa0000"}}>Please select valid option...</Text>;
    }
  }
}
