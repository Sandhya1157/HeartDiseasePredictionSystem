import React from "react";
import { StyleSheet, ImageBackground, Image } from "react-native";
import InputText from "../../components/InputText/InputText";
import { Container, Content, Form, Button, Text, View } from "native-base";
import { DataSetHandler, NaiveBayes } from "../../assets/model/naive_bayes";
import DATA from "../../assets/data/final.json";
import INPUT_DATA from "../../assets/data/inputData.json";
import BG_Image from "../../assets/image/BG_Image.png";
import User_Image from "../../assets/image/User.png";
import SplashScreen from "react-native-splash-screen";
import { MenuButton } from "../../components/MenuBar/MenuButton";

export default class InputScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cp: null,
      cp_error: false,
      ca: null,
      ca_error: false,
      exang: null,
      exang_error: false,
      oldpeak: null,
      oldpeak_error: false,
      slope: null,
      slope_error: false,
      thal: null,
      thal_error: false,
      data: INPUT_DATA
    };
  }

  componentDidMount() {
    this.setState({
      data: INPUT_DATA
    });
    SplashScreen.hide();
  }

  change_cp(value) {
    if (value == null) {
      this.setState({ cp: value, cp_error: true });
    } else {
      this.setState({ cp: value, cp_error: false });
    }
  }
  change_exang(value) {
    if (value == null) {
      this.setState({ exang: value, exang_error: true });
    } else {
      this.setState({ exang: value, exang_error: false });
    }
  }
  change_oldpeak(value) {
    if (value == null) {
      this.setState({ oldpeak_error: true });
    } else {
      this.setState({ oldpeak: value, oldpeak_error: false });
    }
  }
  change_slope(value) {
    if (value == null) {
      this.setState({ slope: value, slope_error: true });
    } else {
      this.setState({ slope: value, slope_error: false });
    }
  }
  change_ca(value) {
    if (value == null) {
      this.setState({ ca: value, ca_error: true });
    } else {
      this.setState({ ca: value, ca_error: false });
    }
  }
  change_thal(value) {
    if (value == null) {
      this.setState({ thal: value, thal_error: true });
    } else {
      this.setState({ thal: value, thal_error: false });
    }
  }

  clickme = () => {
    if (this.state.cp == undefined) {
      alert("Undefined Chest Pain");
      return;
    } else if (this.state.exang == undefined) {
      alert("Undefined Exercise Induced Angina");
      return;
    } else if (this.state.oldpeak == undefined) {
      alert("Undefined ST Depression");
      return;
    } else if (this.state.slope == undefined) {
      alert("Undefined ST Segment");
      return;
    } else if (this.state.ca == undefined) {
      alert("Undefined Number of Vessels");
      return;
    } else if (this.state.thal == undefined) {
      alert("Undefined Stress Test");
      return;
    }
    const dtHandler = new DataSetHandler(DATA);

    const labels = dtHandler.getLabels();
    const dtTrain = dtHandler.getTrainingSet();
    const dtTest = dtHandler.getTestingSet();

    const nb = new NaiveBayes(labels, dtTrain, dtTest);
    let inputArr = [
      this.state.ca,
      this.state.exang,
      this.state.oldpeak,
      this.state.slope,
      this.state.ca,
      this.state.thal
    ];
    nb.calculatePosteriorProbability(inputArr);
    let output = nb.classify();
    if (output == 1) {
      alert("You have high probability of having heart disease.");
    } else {
      alert("You have high probability of not having heart disease.");
    }
  };

  render() {
    const data = this.state.data;
    return (
      <Container>
        <ImageBackground source={BG_Image} style={styles.backgroundImage}>
          <MenuButton navigation={this.props.navigation} />
          <Content padder>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 35
              }}
            >
              <Image source={User_Image} style={styles.userImage} />
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontFamily: "Verdana",
                  fontSize: 16,
                  marginBottom: 20
                }}
              >
                User Input
              </Text>
            </View>
            <Form
              padder
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <InputText
                label="Chest Pain"
                data={data.cp}
                selectedValue={this.state.cp}
                onValueChange={this.change_cp.bind(this)}
                hidden={this.state.cp_error}
              />
              <InputText
                label="Exercise Induced Angina"
                data={data.exang}
                selectedValue={this.state.exang}
                onValueChange={this.change_exang.bind(this)}
                hidden={this.state.exang_error}
              />
              <InputText
                label="ST Depression"
                data={data.oldpeak}
                selectedValue={this.state.oldpeak}
                onValueChange={this.change_oldpeak.bind(this)}
                hidden={this.state.oldpeak_error}
              />
              <InputText
                label="Peak Slope"
                data={data.slope}
                selectedValue={this.state.slope}
                onValueChange={this.change_slope.bind(this)}
                hidden={this.state.slope_error}
              />
              <InputText
                label="Vessels Flouroscopy Colored"
                data={data.ca}
                selectedValue={this.state.ca}
                onValueChange={this.change_ca.bind(this)}
                hidden={this.state.ca_error}
              />
              <InputText
                label="Thalium Stress Test"
                data={data.thal}
                selectedValue={this.state.thal}
                onValueChange={this.change_thal.bind(this)}
                hidden={this.state.thal_error}
              />
              <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                <Button style={styles.predictMe} info onPress={this.clickme}>
                  <Text style={styles.buttonText}>Predict!</Text>
                </Button>
              </View>
            </Form>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  userImage: {
    width: 25,
    height: 30
  },
  predictMe: {
    width: "90%",
    backgroundColor: "#fff",
    color: "#fe3d90",
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 1000,
    marginTop: 45
  },
  buttonText: {
    color: '#fe3d90'
  }
});
