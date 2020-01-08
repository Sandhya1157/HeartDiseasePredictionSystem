import React from "react";
import Canvas from "react-native-canvas";
import Colors from "./Colors";
import { Text, Card, CardItem } from "native-base";

export default class BarGraph extends React.Component {
  handleCanvas = canvas => {
    canvas.height = this.props.height;
    const reference_point = { x: 20, y: canvas.height - 40 };
    const ctx = canvas.getContext("2d");
    let x_change = 0;

    // Creates axis
    ctx.moveTo(0, reference_point.y);
    ctx.lineTo(canvas.width, reference_point.y);
    ctx.stroke();
    ctx.moveTo(reference_point.x, 15);
    ctx.lineTo(reference_point.x, canvas.height);
    ctx.stroke();

    // creates bar graph
    for (let i in this.props.data) {
      for (let j in this.props.data[i]) {
        ctx.fillStyle = Colors[j];
        ctx.font = "12px Arial";
        ctx.fillText(
          this.props.data[i][j],
          reference_point.x + x_change + 3,
          reference_point.y - this.props.data[i][j] - 5
        );
        ctx.fillRect(
          reference_point.x + x_change,
          reference_point.y - this.props.data[i][j],
          20,
          this.props.data[i][j]
        );
        x_change += 20;
      }
      ctx.fillText(
        i,
        reference_point.x + x_change - 18,
        reference_point.y + 15
      );
      x_change += 30;
    }
    ctx.fillStyle = Colors[0];
    ctx.font = "12px Arial";
    ctx.fillText(
      "Heart Disease", 205, 12
    );
    ctx.fillRect(reference_point.x + 160, reference_point.y - 180, 20, 20);
    ctx.fillStyle = Colors[1];
    ctx.fillText(
      "No Disease",
      205,
      35
    );
    ctx.fillRect(reference_point.x + 160, reference_point.y - 160, 20, 20);
    
    ctx.fillStyle = Colors[2];
    ctx.fillText(
      "Num",
      10,
      10
    );
    ctx.fillStyle = Colors[2];
    ctx.fillText(
      this.props.label,
      40,
      210
    );
  };

  render() {
    return (
      <Card>
        <CardItem header>
          <Text>{this.props.label}</Text>
        </CardItem>
        <Canvas ref={this.handleCanvas} />
      </Card>
    );
  }
}
