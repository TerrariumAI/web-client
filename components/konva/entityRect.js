import React, { Component } from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text } from "react-konva";
import Konva from "konva";

class EntityRect extends React.Component {
  state = {
    clicked: false,
    fill: "green"
  };

  componentDidMount() {
    this.setState({
      fill: this.props.fill || ""
    });
  }

  handleClick = () => {
    this.setState({
      clicked: true
    });
  };

  render() {
    const { x, y, w, h } = this.props;
    const { fill, clicked } = this.state;
    return (
      <Rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={fill}
        shadowBlur={clicked ? 5 : 0}
        onClick={this.handleClick}
      />
    );
  }
}

export default EntityRect;
