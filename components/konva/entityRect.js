import React, { Component } from "react";
import { Rect } from "react-konva";
import { CLASS_IDS } from "../../lib/environmentApi";

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
    if (!entity || entity.classID === CLASS_IDS.EMPTY) { // Empty
      fill = "#32ff7e";
    } else if (entity.classID === CLASS_IDS.AGENT) { // Agent
      fill = "#18dcff";
    } else if (entity.classID === CLASS_IDS.ROCK) { // Rock
      fill = "#000000";
    } else if (entity.classID === CLASS_IDS.FOOD) { // Food
      fill = "#33c466";
    }
    return (
      <Rect
        x={screenPos.x}
        y={screenPos.y}
        width={width}
        height={height}
        fill={fill}
        shadowBlur={selected ? 5 : 0}
        onClick={() => onClick(worldPos, entity)}
      />
    );
  }
}

export default EntityRect;
