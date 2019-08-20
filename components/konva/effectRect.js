import React, { Component } from "react";
import { render } from "react-dom";
import { Rect } from "react-konva";
import Konva from "konva";
class EffectRect extends React.Component {
  handleClick = () => {
    this.setState({
      clicked: true
    });
  };

  render() {
    const {
      effect,
      screenPos,
      worldPos,
      width,
      height,
      onClick
    } = this.props;
    let fill = "white";
    if (!effect) { // Empty
      fill = "#00000000";
    } else { 
      let strength = 100 / Math.pow(effect.decay, (new Date().getTime() / 1000) - effect.timestamp)
      strength = Math.round(strength)
      console.log(effect, strength)
      fill = "#5ac0e6"+strength.toString(16);
    }
    return (
      <Rect
        x={screenPos.x}
        y={screenPos.y}
        width={width}
        height={height}
        fill={fill}
      />
    );
  }
}

export default EffectRect;
