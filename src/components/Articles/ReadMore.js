import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  Row,
  CardItem,
  Col,
  Grid,
  Card,
  Text,
  Label,
  Body,
  View
} from "native-base";

export class ReadMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false
    };
  }

  render() {
    data = this.props.data;
    let rName = "HDInfo";
    return (
      <Grid>
        <Row>
          <Col>
            <Card transparent>
              {Object.keys(data).map((val, key) => {
                let k = key;
                if (val == "head") {
                  return (
                    <CardItem style={styles.header} key={key} header>
                      <Label style={styles.headerText}>{data[val]}</Label>
                    </CardItem>
                  );
                } else if (this.state.isShown == false) {
                  let str = data[val].join();
                  return (
                    <CardItem key={k} style={styles.body}>
                      <Body>
                        {(() => {
                          if (str.length > 240) {
                            str = str.substring(0, 210) + "...";
                          }
                          return (
                            <View>
                              <Text style={styles.bodyText}>{str}</Text>
                              <View style={styles.readMore}>
                                <TouchableOpacity
                                  onPress={() => {
                                    this.setState({
                                      isShown: true
                                    });
                                  }}
                                >
                                  <Text
                                    style={{
                                      ...styles.bodyText,
                                      color: "#fff200"
                                    }}
                                  >
                                    Read More >>>
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          );
                        })()}
                      </Body>
                    </CardItem>
                  );
                } else if (val == "label") {
                  return <Label style={styles.headerText}>{data[val]}</Label>;
                } else {
                  return (
                    <CardItem style={styles.body} key={key}>
                      <Body>
                        {Object.keys(this.props.data[val]).map((ele, ind) => {
                          let txt = this.props.data[val][ele];
                          return (
                            <View key={ind}>
                              <Text style={styles.bodyText} key={ind}>
                                {txt}
                              </Text>
                            </View>
                          );
                        })}
                        {
                          <View style={styles.readMore}>
                            <TouchableOpacity
                              onPress={() => {
                                this.setState({
                                  isShown: false
                                });
                              }}
                            >
                              <Text
                                style={{
                                  ...styles.bodyText,
                                  color: "#fff200"
                                }}
                              >
                                &lt;&lt;&lt; Show Less
                              </Text>
                            </TouchableOpacity>
                          </View>
                        }
                      </Body>
                    </CardItem>
                  );
                }
              })}
            </Card>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 0,
    margin: -10,
    marginTop: -25,
    backgroundColor: "transparent"
  },
  headerText: {
    padding: 0,
    margin: 0,
    fontSize: 21,
    color: "#fff",
    fontWeight: "900",
    textShadowColor: "#391f2e",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 15
  },
  body: {
    padding: 0,
    margin: 0,
    backgroundColor: "#46454e",
    borderRadius: 16,
    marginBottom: 20
  },
  bodyText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "300"
  },
  readMore: {
    flex: 0,
    flexDirection: "row-reverse",
    alignItems: "flex-end"
  }
});
