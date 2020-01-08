import React from "react";
import { StyleSheet} from "react-native";
import { Item, Icon, View, Picker } from "native-base";
import ErrorText from "./ErrorText";

export default class InputText extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Item picker>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={styles.input}
            placeholder={this.props.label}
            selectedValue={this.props.selectedValue}
            onValueChange={this.props.onValueChange.bind(this)}
            itemTextStyle={{fontSize: 12, fontWeight: "600"}}
          >
            <Picker.Item
              style={{ color: "#fff" }}
              label={this.props.label}
              value={undefined}
              key={undefined}
            />
            {Object.keys(this.props.data).map(key => {
              return (
                <Picker.Item
                  label={this.props.data[key]}
                  value={key}
                  key={key}
                />
              );
            })}
          </Picker>
        </Item>
        <ErrorText hidden={this.props.hidden} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: "90%",
    fontFamily: "Helvetica",
    color: "#fff",
    marginBottom: -10,
    marginTop: -5,
    borderBottomWidth: 1,
    borderBottomColor: "#000"
  }
});
