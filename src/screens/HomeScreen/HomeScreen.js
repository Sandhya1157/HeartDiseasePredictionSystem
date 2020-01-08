import React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { Container, Content } from "native-base";
import SplashScreen from "react-native-splash-screen";
import BG_Image from "../../assets/image/BG_Image.png";
import { MenuButton } from "../../components/MenuBar/MenuButton";
import HOME_DATA from "../../assets/data/homeData.json";
import { ReadMore } from "../../components/Articles/ReadMore";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: HOME_DATA.content
    };
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Container>
        <ImageBackground source={BG_Image} style={styles.backgroundImage}>
          <MenuButton navigation={this.props.navigation} />
          <Content padder>
            {Object.keys(this.state.data).map((val, key) => {
              return <ReadMore key={key} data={this.state.data[val]}/>;
            })}
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  }
});
