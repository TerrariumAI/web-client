import React, { Component } from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text } from "react-konva";
import Konva from "konva";

class EntityRect extends React.Component {
  handleClick = () => {
    this.setState({
      clicked: true
    });
  };

  render() {
    const {
      entity,
      screenPos,
      worldPos,
      width,
      height,
      selected,
      onClick
    } = this.props;
    let fill = "white";
    if (!entity || entity.class === "EMPTY") {
      fill = "#32ff7e";
    } else if (entity.class === "AGENT") {
      fill = "#18dcff";
    } else if (entity.class === "FOOD") {
      fill = "#3ae374";
    }
    return (
      <Rect
        x={screenPos.x}
        y={screenPos.y}
        width={width}
        height={height}
        fill={fill}
        shadowBlur={selected ? 5 : 0}
        onClick={() => onClick(worldPos)}
      />
    );
  }
}

export default EntityRect;
