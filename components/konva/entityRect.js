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
    const { entity, w, h, fill, selected, onClick } = this.props;
    return (
      <Rect
        x={entity.x * w}
        y={-entity.y * h}
        width={w}
        height={h}
        fill={fill}
        shadowBlur={selected ? 5 : 0}
        onClick={() => onClick(entity)}
      />
    );
  }
}

export default EntityRect;
