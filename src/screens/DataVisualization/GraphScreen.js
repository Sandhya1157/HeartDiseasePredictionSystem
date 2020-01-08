import React from "react";
import { StyleSheet, ActivityIndicator, ImageBackground } from "react-native";
import BarGraph from "../../components/BarGraphs/BarGraph";
import {
  Container,
  Content,
  Grid,
  Row
} from "native-base";
import BG_Image from "../../assets/image/BG_Image.png";
import GRAPH_DATA from "../../assets/data/graphData.json";
import { MenuButton } from "../../components/MenuBar/MenuButton";
import SplashScreen from "react-native-splash-screen";

export default class GraphScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      dataSource: []
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
      dataSource: GRAPH_DATA.info
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Container>
          <Content>
            <ActivityIndicator size="large" Rowor="#0000ff" />
          </Content>
        </Container>
      );
    }
    return (
      <Container>
        <ImageBackground source={BG_Image} style={styles.backgroundImage}>
          <MenuButton navigation={this.props.navigation} />
          <Content padder>
            <Grid style={{ alignItems: "center" }}>
              <Row>
                <BarGraph
                  height={220}
                  data={this.state.dataSource.ca}
                  label="Chest Pain"
                />
              </Row>
              <Row>
                <BarGraph
                  height={220}
                  data={this.state.dataSource.cp}
                  label="Exercise Induced Angina"
                />
              </Row>
              <Row>
                <BarGraph
                  height={220}
                  data={this.state.dataSource.exang}
                  label="ST Depression"
                />
              </Row>
              <Row>
                <BarGraph
                  height={220}
                  data={this.state.dataSource.oldpeak}
                  label="Peak Slope"
                />
              </Row>
              <Row>
                <BarGraph
                  height={220}
                  data={this.state.dataSource.slope}
                  label="Vessels Flouroscopy Colored"
                />
              </Row>
              <Row>
                <BarGraph
                  height={220}
                  data={this.state.dataSource.thal}
                  label="Thalium Stress Test"
                />
              </Row>
            </Grid>
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
